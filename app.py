from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# Inisialisasi database (buat jika belum ada)
def init_db():
    conn = sqlite3.connect('testimoni.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS testimoni (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT NOT NULL,
        pesan TEXT NOT NULL,
        waktu TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    conn.commit()
    conn.close()

# Halaman utama
@app.route('/')
def index():
    return render_template('index.html')

# API untuk menambah testimoni
@app.route('/tambah_testimoni', methods=['POST'])
def tambah_testimoni():
    nama = request.form['nama']
    pesan = request.form['pesan']
    conn = sqlite3.connect('testimoni.db')
    c = conn.cursor()
    c.execute("INSERT INTO testimoni (nama, pesan) VALUES (?, ?)", (nama, pesan))
    conn.commit()
    conn.close()
    return 'success'

# API untuk ambil semua testimoni
@app.route('/ambil_testimoni')
def ambil_testimoni():
    conn = sqlite3.connect('testimoni.db')
    c = conn.cursor()
    c.execute("SELECT nama, pesan FROM testimoni ORDER BY waktu DESC")
    data = c.fetchall()
    conn.close()
    return jsonify(data)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
