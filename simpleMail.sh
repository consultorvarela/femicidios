#!/bin/bash
#username="ferby@stolz-engineering.com"
username="noreply.logitruck@gmail.com"
host="smtp.gmail.com:587"
recipient=$1 
subject=$2
mensage=$3
pass="sxxqjenumpnbvata"
/var/www/dash/logitruck/camiones/dash/sendEmailTLS  -f $username -s $host -bcc $recipient -xu $username -xp $pass -o tls=yes -u $subject -m $mensage
