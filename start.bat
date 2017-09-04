cd CarPartsServer
START /B start cmd.exe @cmd /k "mvn spring-boot:run"
cd ../CarPartsClient
npm start