# Tugas Oprec FUKI 2023
Todolist App using Django REST Framework
<br>

## Deployment
[https://todo-be-production-5000.up.railway.app/](https://todo-be-production-5000.up.railway.app/)

## How to Run the App on Your Local Computer

1. Clone repository ini pada local dengan command 
    
        git clone https://github.com/nailashfrni/todo-be.git
2. (Opsional) Di dalam folder hasil clone sebelumnya, jalankan _virtual environment_ dengan command 
    
        python -m venv env


    Kemudian aktifkan _virtual environment_ dengan perintah berikut.<br>

        Windows: env\Scripts\activate.bat
        Unix: source env/bin/activate

3. Install _dependencies_ yang diperlukan dengan perintah
    
        pip install -r requirements.txt

4. Jalankan perintah untuk migrasi model ke database lokal sebagai berikut.

        python manage.py makemigrations
        python manage.py migrate


5. Jalankan server dengan perintah
        
        python manage.py runserver

    Kemudian, buka [http://localhost:8000/](http://localhost:8000/) untuk mengakses server.
