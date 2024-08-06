cd /home/ubuntu/survey-app/client
npm install
quasar build

cp /home/ubuntu/environment/.env /home/ubuntu/survey-app/server

cd /home/ubuntu/survey-app/server
npm install

systemctl stop surveyApp
systemctl start surveyApp