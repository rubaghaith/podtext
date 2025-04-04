from flask import Flask, request, jsonify
import whisper
import os
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# إعداد مجلد رفع الملفات
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# تحميل نموذج Whisper
model = whisper.load_model("base")

# تحميل نموذج التلخيص
summarizer = pipeline("summarization")

@app.route('/get-transcription', methods=['POST'])
def get_transcription():
    if 'file' not in request.files:
        return jsonify({"status": "error", "message": "لم يتم رفع أي ملف."}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"status": "error", "message": "اسم الملف فارغ."}), 400

    # حفظ الملف في المجلد
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    try:
        file.save(file_path)

        # تحويل الصوت إلى نص
        result = model.transcribe(file_path)
        transcription = result["text"]

        return jsonify({"status": "success", "transcription": transcription})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        # حذف الملف بعد المعالجة
        if os.path.exists(file_path):
            os.remove(file_path)

@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.json
    if not data or "text" not in data:
        return jsonify({"status": "error", "message": "النص مفقود"}), 400

    text = data["text"]

    try:
        # تلخيص النص
        summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
        return jsonify({"status": "success", "summary": summary[0]["summary_text"]})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/')
def home():
    return "خادم Flask يعمل بشكل صحيح!"

if __name__ == '__main__':
    app.run(debug=True)