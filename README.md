# freexit-admin

## START-UP PROCEDURE

==================

- Install and configure mongoDB
- sudo service mongod start|stop|restart or simply mongod
- brew services restart mongodb-community@4.0
- clone the repo
- npm install && npm start

"start": "NODE_ENV=development nodemon --exec babel-node --presets=latest -- ./src",

## ROUTINES

=================

1. pull a particular branch

> git pull origin <branch>

2. Create a new branch named "feature_x" and switch to it using

> git checkout -b feature_x

3. push the branch to your remote repository

> git push origin <branch>

4. switch back to master

> git checkout master

5. and delete the branch again

> git branch -d feature_x

Remove the old origin and readd the correct one:

> git remote remove origin
> git remote add origin <correct address>

Update the existing remote links:

> git remote set-url origin <correct url>

> mongod --shutdown

- User
  eWallet users which are User
- Transaction
  -Setting
  -Charge
  -BankRegister
  -Royal

## TODO TASKLIST

=================

- [x] bank
- [x] bonus
- [x] category
- [x] deposit
- [x] county
- [x] country
- [x] photo
- [x] lien
- [x] mail
- [x] notification
- [x] parcel
- [x] pickup
- [x] rating
- [x] royalty
- [x] schedule
- [x] setting
- [x] shipment
- [x] sms
- [x] state
- [x] admin
- [x] ticket
- [x] track
- [x] transaction
- [x] user
- [x] vehicle
- [x] withdraw

## API ROUTES

================

1. api/transaction

---

- **List Transaction**

  - get /api/transaction

- **Add Transaction**

  - post /api/transaction

- **Delete Transaction**

  - delete /api/transaction/{transactionId}

- **Update Transaction**
  - put /api/transaction/{transactionId}

# freexit-api

ssh -i "freexit.pem" ubuntu@3.139.205.76

/var/www/html/freexit-admin/dist

# SHIPMENT OPERATIONS

- Sender creates parcels
- Sender Creates a Pickup consisting of Array of Parcels
- PENDING: Pickup status waiting to be picked up
- DISPATCH: The System runs a cron-job every minute that assigns pickups to near by couriers or
  the Courier can manually run a dispatch-service to indicate his interest to pickup
- PACKAGE: Sender indicates Courier has arrives and has loaded the parcel
- SHIP | DISAPPROVE: Courier agrees or disagrees to carry the parcel. Sender gets DEBITED if approves
- RECEIVE: Indicated by Sender including a rating that Recipient has confirmed getting the item. The courier gets paid
- CANCEL: Sender could decline shipping the pickup before it gets shipped at APPROVE stage
- DISPUTE: Courier or Sender could raise a dispute if unsatisfied with the QoS delivered.


