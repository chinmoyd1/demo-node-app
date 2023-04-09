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
				script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                    try {
                        dockerImage.inside() {
                            // Extracting the PROJECTDIR environment variable from inside the container
                            def PROJECTDIR = sh(script: 'echo \$PROJECTDIR', returnStdout: true).trim()
                            // Copying the project into our workspace
                            sh "cp -r '$PROJECTDIR' '$WORKSPACE'"
                            // Running the tests inside the new directory
                            dir("$WORKSPACE$PROJECTDIR") {
                                //sh "npm test"
                            }
							sh "curl localhost:3000"
                        }

                    } finally {
                        // Removing the docker image
                        sh "docker rmi $registry:$BUILD_NUMBER"
						// docker rm demo-node-app:${BUILD_NUMBER}
                    }
                }
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