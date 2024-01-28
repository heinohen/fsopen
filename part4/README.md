# Part 4

## Bloglist

Rakennamme tämän osan tehtävissä blogilistasovellusta, jonka avulla käyttäjien on mahdollista tallettaa tietoja Internetistä löytämistään mielenkiintoisista blogeista.

## Tehtävät

- [x] 4.1 Tee sovelluksesta toimiva npm-projekti. Jotta sovelluskehitys olisi sujuvaa, konfiguroi sovellus suoritettavaksi nodemonilla. Voit luoda sovellukselle uuden tietokannan MongoDB Atlasiin tai käyttää edellisen osan sovelluksen tietokantaa.
- [x] 4.2 Jaa sovelluksen koodi tämän osan alun tapaan useaan moduuliin.
- [x] 4.3 Määrittele ensin funktio dummy, joka saa parametrikseen taulukollisen blogeja ja palauttaa aina luvun 1. Tiedoston list_helper.js sisällöksi siis tulee tässä vaiheessa
- [x] 4.4 Määrittele funktio totalLikes, joka saa parametrikseen taulukollisen blogeja. Funktio palauttaa blogien yhteenlaskettujen tykkäysten eli likejen määrän. Määrittele funktiolle sopivat testit. Funktion testit kannattaa laittaa describe-lohkoon jolloin testien tulostus ryhmittyy miellyttävästi
- [x] 4.5* Määrittele funktio favoriteBlog, joka saa parametrikseen taulukollisen blogeja. Funktio selvittää millä blogilla on eniten tykkäyksiä. Jos suosikkeja on monta, riittää että funktio palauttaa niistä jonkun.
- [x] 4.6* Määrittele funktio mostBlogs, joka saa parametrikseen taulukollisen blogeja. Funktio selvittää kirjoittajan, jolla on eniten blogeja. Funktion paluuarvo kertoo myös ennätysbloggaajan blogien määrän:
- [x] 4.7* Määrittele funktio mostLikes, joka saa parametrikseen taulukollisen blogeja. Funktio selvittää kirjoittajan, jonka blogeilla on eniten tykkäyksiä. Funktion paluuarvo kertoo myös suosikkibloggaajan likejen yhteenlasketun määrän:
- [x] 4.8 Tee SuperTest-kirjastolla testit blogilistan osoitteeseen /api/blogs tapahtuvalle HTTP GET ‑pyynnölle. Testaa, että sovellus palauttaa oikean määrän JSON-muotoisia blogeja.
- [x] 4.9 Tee testi, joka varmistaa että palautettujen blogien identifioivan kentän tulee olla nimeltään id. Oletusarvoisestihan tietokantaan talletettujen olioiden tunnistekenttä on _id. Olion kentän olemassaolon tarkastaminen onnistuu Jestin matcherillä toBeDefined.
- [x] 4.10 Tee testi, joka varmistaa, että sovellukseen voi lisätä blogeja osoitteeseen /api/blogs tapahtuvalla HTTP POST ‑pyynnöllä. Testaa ainakin, että blogien määrä kasvaa yhdellä. Voit myös varmistaa, että oikeansisältöinen blogi on lisätty järjestelmään. Kun testi on valmis, refaktoroi operaatio käyttämään promisejen sijaan async/awaitia.
- [x] 4.11* Tee testi, joka varmistaa, että jos kentälle likes ei anneta arvoa, asetetaan sen arvoksi 0. Muiden kenttien sisällöstä ei tässä tehtävässä vielä välitetä.
- [x] 4.12* Tee testit blogin lisäämiselle eli osoitteeseen /api/blogs tapahtuvalle HTTP POST ‑pyynnölle jotka varmistavat, että jos uusi blogi ei sisällä kenttää title tai kenttää url, pyyntöön vastataan statuskoodilla 400 Bad Request.
- [x] 4.13 blogilistan laajennus, step1
Toteuta sovellukseen mahdollisuus yksittäisen blogin poistoon.
Käytä async/awaitia. Noudata operaation HTTP-rajapinnan suhteen RESTful-käytänteitä.Toteuta ominaisuudelle myös testit.
- [x] 4.14* blogilistan laajennus, step2
Toteuta sovellukseen mahdollisuus yksittäisen blogin muokkaamiseen. Käytä async/awaitia.
Tarvitsemme muokkausta lähinnä likejen lukumäärän päivittämiseen. Toiminnallisuuden voi toteuttaa samaan tapaan kuin muistiinpanon päivittäminen toteutettiin osassa 3. Toteuta ominaisuudelle myös testit.
- [x] 4.15: Tee sovellukseen mahdollisuus luoda käyttäjiä tekemällä HTTP POST -pyyntö osoitteeseen api/users. Käyttäjillä on käyttäjätunnus, salasana ja nimi. Tee järjestelmään myös mahdollisuus katsoa kaikkien käyttäjien tiedot sopivalla HTTP-pyynnöllä.
- [x] 4.16*: Laajenna käyttäjätunnusten luomista siten, että käyttäjätunnuksen sekä salasanan tulee olla olemassa ja vähintään 3 merkkiä pitkä. Käyttäjätunnuksen on oltava järjestelmässä uniikki.
- [x] 4.17: Laajenna blogia siten, että blogiin tulee tieto siitä lisänneestä käyttäjästä.
- [x] 4.18: Toteuta järjestelmään token-perustainen autentikointi
- [x] 4.19: Muuta blogien lisäämistä siten, että se on mahdollista vain jos lisäyksen tekevässä HTTP POST -pyynnössä on mukana validi token. Tokenin haltija määritellään blogin lisääjäksi
- [x] 4.20*: Refraktoroi tokenExtractor omaksi middlewareen
- [x] 4.21*: Muuta blogin poistavaa operaatiota siten, että poisto onnistuu ainoastaan jos poisto-operaation tekijä (eli se kenen token on pyynnön mukana) on sama kuin blogin lisääjä.
