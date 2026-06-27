# Capacitor Rules
-keep class ai.echoverse.app.** { *; }
-keep class com.getcapacitor.** { *; }
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keepattributes JavascriptInterface
-dontwarn com.getcapacitor.**

# General Android
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable
-keep public class * extends java.lang.Exception

# WebView
-keepclassmembers class fqcn.of.javascript.interface.for.webview {
   public *;
}
