# Spotify Preparation

## Authenticate Account

```bash
https://accounts.spotify.com/authorize?client_id=703d39064908445898701a125f391745&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing,user-read-recently-played,user-read-playback-state,user-read-playback-position,user-top-read,playlist-read-collaborative,playlist-read-private
```

Get the &code from the uri

```bash
AQBQYjryW7IyFyKUa48ebqdvgJ3A_9ejbuqAqhBzvaW1UEQ7-9QN7qaiaGRVGenEkDaPhF7NZjDK8rwANMYO7-AQ1TONvaKGLv_02uoq3JvrrrUmerFqA6n-kIkF8NXya6DGGx0QwqcltS0VLykH6AbruWHljbETdRBngwEAMQLRW6hRI8ohayHHPWxK-Kqlq5gtv_illBK6fa3hKExjfa1qwDbyOTca2CxEMKAzSO3XvCn5_-TrV0nrR0qyMGgyQmILd-d0RVRoY9p_xaiR675DacB-YRZEBzPfyvbielrTXiuffZlZ909zLayTRwIRmy1EOnYG2iF2AOlBgtLv0guOc7qmYzKpaFEhP1JzW1PJfYKWd6iDpiHxhPEucxfYvQHEjGm97fzVkwU
```

Encrypt your client_id:client_secret in base64

> ODYwNzYzZDYxZDJlNGQ3NDg4NmE4YjM4YmQ0YWI1MWU6MDJlYzZmMTBlYzJlNDI1ZGI4Mzg4YmU0YzJjMTAzM2E=

Call with `curl` the authorization API

```shell
curl -H "Authorization: Basic NzAzZDM5MDY0OTA4NDQ1ODk4NzAxYTEyNWYzOTE3NDU6NzgxMWEzN2IxMmE3NGUxM2EyNDViNGZlZDNjZjRjOTA=" -d grant_type=authorization_code -d code=AQBQYjryW7IyFyKUa48ebqdvgJ3A_9ejbuqAqhBzvaW1UEQ7-9QN7qaiaGRVGenEkDaPhF7NZjDK8rwANMYO7-AQ1TONvaKGLv_02uoq3JvrrrUmerFqA6n-kIkF8NXya6DGGx0QwqcltS0VLykH6AbruWHljbETdRBngwEAMQLRW6hRI8ohayHHPWxK-Kqlq5gtv_illBK6fa3hKExjfa1qwDbyOTca2CxEMKAzSO3XvCn5_-TrV0nrR0qyMGgyQmILd-d0RVRoY9p_xaiR675DacB-YRZEBzPfyvbielrTXiuffZlZ909zLayTRwIRmy1EOnYG2iF2AOlBgtLv0guOc7qmYzKpaFEhP1JzW1PJfYKWd6iDpiHxhPEucxfYvQHEjGm97fzVkwU -d redirect_uri=http%3A%2F%2Flocalhost:3000 https://accounts.spotify.com/api/token
```

> Response

```json
{"access_token":"BQAJD_UbJTIzc0bRvxq-dZK2i-rPaMKQKrMdnJSKrxOaoxySRkVmFTyNwbJ66G-sGewMa7mnvm_svAo0l9UZwkZTzt44VllQS4NQIDdnrc6ES55dwK2WOjyVJAWZiCPDcBNsf1jmc3U73E3MRZiqP3pgiaZkomCzCned6yNsZQAQnhwaxg_ZwuS_DDASNhHjYtuuxA","token_type":"Bearer","expires_in":3600,"refresh_token":"AQCUq_VF-eBp6hIsMGRuna5Sdjzbo25YGOt059emsNwErXVHSbo9yDbeTCUfn_Q5dL-MrmPB_f8xF1_JaEZvkV3MZ3-HdPzSiRHrgheZOIx8IatHqXki8vrnijtABpDbEik","scope":"playlist-read-private playlist-read-collaborative user-read-playback-state user-read-currently-playing user-read-recently-played user-read-playback-position user-top-read"}
```

Example of API call

```bash
curl -X "GET" "https://api.spotify.com/v1/me/player/currently-playing" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQD3iE9H0PBHKC5l6oAKVho_dpiQyLCTnnVc7dcAqJ3MclZVYS7vpb565Fxy197FJIMCxEnsVeiW8FTdR_QVyxzK4sp0vK2u2gWWvIV7fNqfJwDMCbTiP5sC1oyITS72twFzWg9r8lYgz4x5dbBdEIcOPqwtFHxuEEUG-B83xEc"
```
