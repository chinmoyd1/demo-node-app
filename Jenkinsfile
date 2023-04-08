pipeline{
	agent any
	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
	}
	stages {
	    stage('Checkout') {
			steps {
				    git url: 'https://github.com/chinmoyd1/demo-node-app.git',
                        branch: 'main'
			}
		}
		stage('Build') {
			steps {
                sh 'ls'
				sh 'docker build -t rick1113/demo-node-app:0.1 .'
			}
		}
		stage('Login') {
			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}
		stage('Push') {
			steps {
				sh 'docker push rick1113/demo-node-app:0.1'
			}
		}
	}

	post {
		always {
			sh 'docker logout'
		}
	}

}