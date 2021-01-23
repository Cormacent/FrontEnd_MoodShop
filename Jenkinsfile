

pipeline {
    agent any 

    parameters {
        string(name: 'DOCKERHUB', defaultvalue: 'halohalo', description: 'testteest')
        booleanParams(name: 'RUNTEST', defaultvalue: 'true', description: 'testteest')
        choise(name: 'DEPLOY', choices: ['yes','no'], description: 'testteest')
    }

    stages {
        stage('Build') { 
            steps {
                echo "hello from build"
            }
        }
        stage('Test') { 
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                echo "hello from Test"
            }
        }
        stage('Deploy') { 
            when {
                expression {
                    params.DEPLOY == 'yes'
                }
            }
            steps {
                echo "hello from Deploy"
            }
        }
    }
}
