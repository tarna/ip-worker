# IP Worker
A simple cloudflare worker that returns the IP address of a request. It also contains a bunch of different information about that IP provided by cloudflare.

## Endpoints
- https://ip.tarna.workers.dev - Returns both the request IP and information about it provided by cloudflare in a JSON format.
- https://ip.tarna.workers.dev/plain - Returns just the request IP in a simple text format.

## Deploy
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/tarna/ip-worker)

## Usage
### JavaScript / TypeScript
```js
const data = await fetch('https://ip.tarna.workers.dev').then(res => res.json());
console.log(data);
```

### Python
```py
import requests

response = requests.get('https://ip.tarna.workers.dev')
data = response.json()
print(data)
```

### Kotlin
```kotlin
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URI

fun main() {
    val url = URI.create("https://ip.tarna.workers.dev").toURL()
    with(url.openConnection() as HttpURLConnection) {
        requestMethod = "GET"

        inputStream.bufferedReader().use {
            val response = it.readText()
            val json = JSONObject(response)
            println(json.toString(4))
        }
    }
}
```

### Java
```java
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;

public class Main {
    public static void main(String[] args) {
        try {
            URI url = URI.create("https://ip.tarna.workers.dev");
            HttpURLConnection conn = (HttpURLConnection) url.toURL().openConnection();
            conn.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }

            in.close();
            conn.disconnect();

            JSONObject json = new JSONObject(content.toString());
            System.out.println(json.toString(4));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```