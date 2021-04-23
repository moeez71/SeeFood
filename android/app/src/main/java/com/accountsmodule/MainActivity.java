package com.accountsmodule;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
   @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, R.id.lottie); // here
    SplashScreen.setAnimationFinished(true); // If you want the animation dialog to be forced to close when hide is called, use this code
    super.onCreate(savedInstanceState);
    // ...other code
  }
  @Override
  protected String getMainComponentName() {
    return "AccountsModule";
  }
}
