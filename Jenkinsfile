pipeline{
	agent any
	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
		REGISTRY = "rick1113/demo-node-app"
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
				docker build -t ${REGISTRY}:${BUILD_NUMBER} .
				'''
			}
		}
		stage('Test') {
			steps {
				sh '''
				docker run --name demo-node-app ${REGISTRY}:${BUILD_NUMBER} npm run test
				'''
			}
		}
		stage('Package') {
			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
				sh 'docker push ${REGISTRY}:${BUILD_NUMBER}'
			}
		}
	}

	post {
		always {
			sh 'docker rm -f $(docker ps -a -q  --filter ancestor=${REGISTRY}:${BUILD_NUMBER})'
			sh 'docker rmi ${REGISTRY}:${BUILD_NUMBER}'
			sh 'docker logout'
		}
	}

}