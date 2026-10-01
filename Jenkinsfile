pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        SELENIUM_URL = 'http://selenium:4444/wd/hub'
        APP_URL = 'http://jenkins:4000'
    }

    stages {

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Unit Test') {
            steps {
                sh 'JEST_JUNIT_OUTPUT_NAME=junit-unit.xml npx jest tests/task.test.js --runInBand'
            }
        }

        stage('Start App') {
            steps {
                sh 'nohup node src/app.js > app.log 2>&1 &'
                sh 'sleep 5'
            }
        }

        stage('UI Test') {
            steps {
                sh 'JEST_JUNIT_OUTPUT_NAME=junit-ui.xml npx jest tests/e2e/home.test.js --runInBand'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t task-tracker:${BUILD_NUMBER} .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker rm -f task-tracker || true'
                sh 'docker run -d --name task-tracker --network ci-network -p 4000:4000 task-tracker:${BUILD_NUMBER}'
            }
        }
    }

    post {
        always {
            junit 'junit-*.xml'
        }
    }
}