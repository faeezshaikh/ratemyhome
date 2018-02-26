# FineBites


https://lipis.github.io/bootstrap-social/

  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
 <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.css" rel="stylesheet"> 

sudo ionic cordova build --release android	

(Already generated - do not lose - If Key not already present)
keytool -genkey -v -keystore  awsArch-key.keystore -alias awsArch- -keyalg RSA -keysize 2048 -validity 100000

rm *.apk
cp /Users/faeezshaikh/git/finebites/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk .
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore awsArch-key.keystore app-release-unsigned.apk awsArch-

C:\Users\FSHAI\AppData\Local\Android\android-sdk\build-tools\23.0.1\zipalign -v 4 android-release-unsigned.apk AWS-Certified-Arch.apk
/Users/faeezshaikh/Library/Android/sdk/build-tools/27.0.0/zipalign -v 4 app-release-unsigned.apk FineBites.apk


sudo chmod -R a+rw ios/

For Google 403 Error: Disallowed_Useragent added 
<preference name="OverrideUserAgent" value="Mozilla/5.0 Google" />

https://javebratt.com/ionic-social-login-firebase/

8. Finish Check order status page.
  - Add Final amount to order.
  - Show total meals and totla amount
1. Add new 'Contact us' page.
2. Remove MY profile page.
6. Icon and splash screen - Remove splash screen.i
4. Stars and other tiny icons
7. Admin page for all orders
9. Error conditions. no internet. bad card etc
10. Payment for browser doesnt work
11. Android login not working.

---------------

1. Merge NodeJS services into one.
0. Deploy service to Lambda or Heroku

0. Validate session cart contents. When deleted - Deleted on shutting the app down.
5. iPhone , CART COUNTER IS NOT ON CART
2. MEal Details page
3. Add 8 meals. 4 bkfasts
1. Form validation for Checkout page
2. Send email on order completion. buyer and admin
3. Disable + button when 'Remove items to continue' scenario arises.


ERROR:
Cannot read property 'manifest' of undefined after defining host for universal links

https://github.com/nordnet/cordova-universal-links-plugin/issues/134

https://github.com/nordnet/cordova-universal-links-plugin/commit/b2c5784764225319648e26aa5d3f42ede6d1b289#diff-d5955d9f4d88b42e5efd7a3385be79e9