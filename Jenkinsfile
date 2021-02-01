def dockerhub = "zakimaulana/frontendmoodshop"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any 

    stages {
        stage('Install Dependencies') { 
            steps {
                nodejs('node14yarn') {
                    sh 'yarn install'
                    sh 'printf "VUE_APP_URL=http://3.90.20.177:30123/api/\nVUE_APP_API=3.90.20.177:30123/api/" > .env'
                    sh 'yarn build'
                }
            }
        }
        stage('build docker image') { 
             steps { 
                script {
                    builder = docker.build(image_name, "--no-cache .")
                }
            }
        }
        stage("remove unused docker image"){
            steps{
                script {
                    sh 'docker rmi \$(docker images -f "dangling=true" -q)'
                }
            }
        }
        stage('test docker image') { 
            steps {
                script {
                    builder.inside {
                        sh 'echo passed'
                    }
                }
            }
        }
        stage('Push Image to Registries') { 
            steps {
                script {
                    builder.push()
                }
            }
        }
        stage("Deploy to k8s"){
            steps{
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'k8s-ctrl',
                                verbose: true,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'moodshop.yml',
                                        execCommand: "echo "c0b4d1b4c4" | sudo -S kubectl apply -f moodshop.yml",
                                        execTimeout: 1200000
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}
