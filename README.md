# Projektarbete_Javascriptbaserad_webbutveckling_API
Detta är filerna för mitt REST-api i projektarbetet för kursen JavaScriptbaserad Webbutveckling.

<h1>REST-apo</h1><br>
<p>Detta är ett API skapat i JavaScript för projektuppgift i kursen Fullstacks-utveckling med Ramverk</p>

<h1>Användning API</h1><br>
  
<table>
<thead>
<tr>
<th>Metod</th>
<th>Ändpunkt</th>
<th>Beskrivning</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td>/horses</td>
<td>Hämtar alla hästar i databasen.</td>
</tr>
<tr>
<td>GET</td>
<td>/horses/id</td>
<td>Hämtar en specifik hästt med angivet ID.</td>
</tr>
<tr>
<td>POST</td>
<td>/horses/</td>
<td>Lagrar ny data. Kräver att ett objekt skickas med, dvs en häst</td>
</tr>
<tr>
<td>PUT</td>
<td>/horses/id</td>
<td>Uppdaterar en existerande häst med angivet ID. Kräver att ett objekt skickas med, dvs en ny häst</td>
</tr>
<tr>
<td>DELETE</td>
<td>/horses/id</td>
<td>Raderar en häst med angivet ID.</td>
</tr>
</tbody>
</table>

  
  <h1>Produkt</h1>
  Ett häst-objekt returneras/skickas som JSON med följande struktur:
  
    {
    "_id": "63bd7bc1b22d998f357327a7",
    "name": "Brunte",
    "breed": "Shetland",
    "age": "15",
    "owner": "Lisa"
  
