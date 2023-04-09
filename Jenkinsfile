pipeline{
	agent any
	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
	}
	stages {
	    stage('Clone') {
			steps {
				git url: 'https://github.com/chinmoyd1/demo-node-app.git',
                    branch: 'main'
			}
		}
		stage('Build') {
			steps {
				sh '''
				docker build -t demo-node-app:${BUILD_NUMBER} .
				'''
			}
		}
		stage('Test') {
			steps {
				sh '''
				docker run -it demo-node-app:${BUILD_NUMBER}
				curl localhost:3000
				docker rm demo-node-app:${BUILD_NUMBER}
				'''
			}
		}
		stage('Package') {
			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
				sh 'docker push rick1113/demo-node-app:${BUILD_NUMBER}'
			}
		}
	}

	post {
		always {
			sh 'docker logout'
		}
	}

}