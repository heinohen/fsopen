// erillinen kokeilusovellus

const mongoose = require('mongoose')

// if (process.argv.length>3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

// Koodi siis olettaa että sille annetaan parametrinä MongoDB ATlasissa luodulle käyttäjälle määritelty salasana.
// Komentoriviparametriin se pääsee käsiksi seuraavasti:
const password = process.argv[2]
const nameOfDB = "noteApp"
const url = `mongodb+srv://mongohenkka:${password}@isoklusteri.ms3ihqf.mongodb.net/${nameOfDB}?retryWrites=true&w=majority`


// Yhteyden luonti
mongoose.set('strictQuery', false)
mongoose.connect(url)

// Muistiinpanon skeema ja sitä vastaava model
// Ensin muuttujaan määritellään muistiinpanon skeema joka kertoo Mongooselle miten muistiinpano-oliot tulee tallettaa tietokantaan



const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


// jos argumenttejä on vain 1 ==> listataan tietokannassa olevat
if (process.argv.length === 3) {
    console.log('notebook:')
    Note.find({}).then(result => {
        result.forEach(n => {
            console.log(n.content, n.important)
        })
        mongoose.connection.close()
    })
} 
// jos argumenttejä on 3 lisätään content: seuraava arg important sitä seuraava
else if (process.argv.length === 5) {

// Modelin määrittelyssä ensimmäisenä parametrinä oleva merkkijono 'Note' määrittelee, että Mongoose tallettaa muistiinpanoa vastaavat oliot kokoelmaan 
// nimeltä notes KOSKA
// Mongoosen konventiona on määritellä kokoelmien nimet monikossa (esim notes) kun niihin viitataan skeeman määrittelyssä yksikkömuodossa (esim Note)
// Sovellus luo muistiinpanoa vastaavan model:in avulla muistiinpano-olion
// Modelit ovat ns. konstruktorifunktioita, jotka luovat parametrien perusteella JavaScript-olioita. Koska oliot on luotu modelien konstruktorifunktiolla,
// niillä on kaikki modelien ominaisuudet eli joukko metodeja, joiden avulla olioita voidaan mm. tallettaa tietokantaan.

    const note = new  Note({
        content: process.argv[3], // komentoriviltä salasanan jälkeen seuraava argumentti
        important: process.argv[4], // ja sitä seuraava...
    })

// Tallettaminen tapahtuu metodilla save. Metodi palauttaa promisen
// jolle voidaan rekisteröidä then metodin avulla tapahtumankäsittelijä
    note.save().then(result => {
        console.log(`added note ${result.content} ${result.important}`)
// kun olio on tallennettu kantaan kutsutaan thenin parametrinä olevaa tapahtumankäsittelijää joka sulkee tietokantayhteyden
// HUOM ilman sulkemista ohjelman suoritus ei pääty!
        mongoose.connection.close()
    })


}






// Oliot haetaan kannasta Note-modelin metodilla 'find', metodin parametrinä on hakuehto
// KOSKA hakuehto on tyhjä olio === {}, saimme kannasta kaikki notes-kokoelmaan talletetut oliot
// voisimme hakea myös pelkästään tärkeät
