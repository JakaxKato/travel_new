pipeline {
    agent any

    environment {
        VENV_PATH = 'venv'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/JakaxKato/travel_new.git'
            }
        }

        stage('Setup Virtual Environment') {
            steps {
                sh '''
                python3 -m venv $VENV_PATH
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                source $VENV_PATH/bin/activate
                pip install --upgrade pip
                pip install -r requirements.txt
                '''
            }
        }

        stage('Run Flask App') {
            steps {
                sh '''
                source $VENV_PATH/bin/activate
                python app.py
                '''
            }
        }
    }
}
