# Instantaneous PokéLatin Decipherer

This project aims to simplify the search of viable deciphers for the words found in the PokéLatin script, which corresponds to:

- Pokémon Sword/Shield
- Pokémon Scarlet/Violet
- Pokémon Legends: ZA

To do so, this simple webpage shows a table containing important data about the inscriptions, namely:

1. The text, in the Thraex Sans font, available on the [Pokémon Aaah! site](https://www.pokemonaaah.net/artsyfartsy/fonts/).
2. The transcribed text, using a JSON dictionary provided by the user.
3. What the text is suposed to mean based on its context.
4. Comments made by researchers about the inscriptions.
5. The region where the text was found.

## What you can do on the webpage

1. Filter by ciphered text
2. Filter by region
3. Provide a transcription dictionary as a JSON object

## How to format the JSON transcription dictionary

```
{"ciphered_letter1":"deciphered_letter1",...,"ciphered_letterN":"deciphered_letterN"}
```

So, if you want to decipher the text "?QT8" as "POKE", you would provide the following JSON:

```
{"?":"P","Q":"O","T":"K","8":"E"}
```