import React from 'react';

const Ohjeet = ({ lang, title }) => {
  switch (lang) {
    case 'sv-FI':
      return (
        <>
          <h1>{title}</h1>

          <p>
            I tjänsten kan du bläddra, söka och läsa annonser och sammanfattningar utan att vara
            inloggad. För att lägga till eller svara på annonser ska du logga in i tjänsten.
          </p>

          <h3>1. Inloggning och registrering i tjänsten</h3>

          <p>
            Vid första inloggning görs registreringen och identifieringen i tjänsten genom stark
            autentisering: antingen med nätbankkoder eller mobilcertifikat. Stark identifiering görs
            endast i samband med registrering. För registrering behöver du FO-numret och
            kontaktuppgifterna för den organisation som du representerar. Den person som registrerar
            sig måste för att få uträtta ärenden i organisationens namn ha fått tillstånd av den
            person som har rätt att teckna organisationens firma och en försäkran ska ges om detta.
          </p>

          <p>
            I samband med registrering skapas användarkoder som används i fortsättningen på
            Materialtorget.
          </p>

          <h3>2. Granskning av uppgifter om organisationen</h3>

          <p>
            Efter registrering dirigeras du till organisationens sida, där du kan uppdatera
            uppgifter om organisationen och se vilka personer som använder tjänsten i
            organisationens namn.
          </p>

          <p>
            Det är bra för organisationer som tillhandahåller avfallsbehandlings- eller
            transporttjänster att lägga till referensuppgifter{' '}
            <a href="/tietoa-palvelusta#ymparistoluvista">
              {' '}
              om miljötillstånd och avfallshanteringsregistret i uppgifterna om organisationen
            </a>
            .
          </p>

          <h3>3. Läs annonser</h3>

          <p>För en inloggad användare visas alla uppgifter om annonserna.</p>

          <h3>4. Besvara annonser</h3>
          <p>
            Du kan svara på annonserna och lämna offerter. De inlämnade svaren och offerterna gäller
            mellan annonsören och den som svarat, och de visas inte för andra användare.
          </p>

          <h3>5. Lägga till annons</h3>

          <p>
            Du kan lägga till en egen annons med knappen ”Lägg till annons”. Först väljer du en
            annonstyp som lämpar sig för situationen, varefter rätt annonsblankett som du ska fylla
            i öppnas. Om du väljer ”Jag söker en mottagare för material”, ska du också definiera om
            det är frågan om avfall och om du vill fylla i annonsen så att du vid behov kan gå
            vidare för att begära{' '}
            <a href="/tietoa-palvelusta#tsv">kommunal avfallshantering i andra hand.</a>
          </p>
          <p>
            Annonsblanketten ska ifyllas enligt anvisningen. Ju fler och mer exakta uppgifter du kan
            ge om materialet, desto lättare är det att svara på annonsen och lämna offerter. Den
            färdiga annonsen publiceras på sidan ”Annonser” på Materialtorget.
          </p>
          <p>Du kan lägga till bilder och andra bilagor om annonsen.</p>

          <h3>6. Redigera och ta bort annons</h3>

          <p>
            En publicerad annons återfinns på sidan ”Mina annonser”. Där kan du redigera eller ta
            bort annonsen, även om giltighetstiden inte har gått ut.
          </p>

          <h3>7. Mottagning och visning av svar och offerter</h3>

          <p>
            Du kan läsa svar eller offerter som inkommit på en annons via sidan ”Mina annonser”.
            Inkomna annonser kan godkännas eller avslås. Fortsatt kontakt med en partner som hittats
            görs utanför Materialtorget.
          </p>

          <h3>8. Borttagning, arkivering och publicering på nytt av en annons</h3>

          <p>
            Annonserna tas bort från de publicerade annonserna automatiskt efter att giltighetstiden
            gått ut. Giltighetstiden kan vara högst sex månader. Borttagna annonser arkiveras i
            annonsörens egna annonser, varifrån det också är möjligt att publicera dem på nytt vid
            behov.
          </p>

          <h3>Anvisningar för områdeskoordinatorer</h3>
          <p>1. Registrering i tjänsten</p>
          <p>
            Vid registrering väljs rollen ”Områdeskoordinator” och registreringen görs enligt
            beskrivningen ovan. När du registrerar dig som områdeskoordinator granskar och godkänner
            Motiva Oy dock din registrering.
          </p>
          <p>2. Lämnande av annons i någon annan än din egen organisations namn</p>
          <p>
            Som områdeskoordinator kan du också göra annonser om material som erbjuds eller tas emot
            i någon annan än din organisations namn. I detta fall kan du i fältet för
            kontaktuppgifter lägga till uppgifter om det företag, för vars räkning du gjort
            annonsen. Du kan också själv fungera som kontaktperson, om annonsören önskar det. Då
            behöver företaget som erbjuder eller önskar material inte nämnas i annonsen, om
            företaget inte önskar det. Uppgifter om ett företag i vars namn annonsen har gjorts kan
            ges även i fritextfältet.
          </p>
          <p>
            Områdeskoordinatorn kan inte göra en annons om avfall för ett annat företags räkning.
          </p>
        </>
      );

    default: {
      return (
        <>
          <h1>{title}</h1>

          <p>
            Palvelussa voi selata, etsiä ja katsella ilmoituksia ja koostetietoja kirjautumatta.
            Lisätäkseen ilmoituksen tai vastatakseen ilmoituksiin tulee kirjautua palveluun.
          </p>

          <h3>1. Kirjautuminen ja rekisteröityminen palveluun</h3>

          <p>
            Ensimmäisellä kirjautumiskerralla palveluun rekisteröidytään ja tunnistaudutaan
            vahvasti: joko verkkopankkitunnuksilla tai mobiilivarmenteella. Vahva tunnistautuminen
            tehdään vain rekisteröitymisen yhteydessä. Rekisteröitymiseen tarvitset edustamasi
            organisaation y-tunnuksen ja yhteystiedot. Rekisteröityvällä henkilöllä tulee olla
            organisaation nimenkirjoitusoikeudellisen henkilön lupa asioida palvelussa organisaation
            nimiin ja tästä on annettava vakuutus.
          </p>

          <p>
            Rekisteröitymisen yhteydessä luodaan käyttäjätunnukset, joita käytetään jatkossa
            Materiaalitorissa asioidessa.
          </p>

          <h3>2. Organisaatiotietojen tarkistaminen</h3>

          <p>
            Rekisteröitymisen jälkeen sinut ohjataan organisaation sivulle, jossa voi päivittää
            organisaation tietoja ja katsoa, ketkä henkilöt käyttävät palvelua organisaation
            nimissä.
          </p>

          <p>
            Jätteen käsittely- tai kuljetuspalveluja tarjoavien organisaatioiden on hyvä lisätä
            organisaation tietoihin viitetiedot{' '}
            <a href="/tietoa-palvelusta#ymparistoluvista">
              ympäristöluvista ja jätehuoltorekisteristä
            </a>
            .
          </p>

          <h3>3. Ilmoitusten katselu</h3>

          <p>Kirjautuneena käyttäjälle näkyvät ilmoituksista kaikki tiedot.</p>

          <h3>4. Ilmoituksiin vastaaminen</h3>
          <p>
            Ilmoituksiin voi vastata ja jättää tarjouksia. Jätetyt vastaukset ja tarjoukset ovat
            ilmoittajan ja vastaajan välisiä eivätkä ne näy muille käyttäjille.
          </p>

          <h3>5. Ilmoitusten lisääminen</h3>

          <p>
            Oman ilmoituksen voi tehdä ”Lisää ilmoitus” -painikkeella. Ensin valitaan tilanteeseen
            sopiva ilmoitustyyppi, jonka jälkeen avautuu täytettäväksi oikeanlainen ilmoituslomake.
            Jos valitaan ilmoitustyyppi ”Etsin materiaalille vastaanottajaa”, tulee vielä
            määritellä, onko kyseessä jäte ja haluaako täyttää ilmoituksen niin, että voi
            tarvittaessa edetä pyytämään{' '}
            <a href="/tietoa-palvelusta#tsv">kunnan toissijaista jätehuoltopalvelua.</a>
          </p>
          <p>
            Ilmoituslomake täytetään ohjeiden mukaan. Mitä enemmän ja tarkempia tietoja pystyy
            materiaalista tai palvelusta antamaan, sitä helpompi siihen on vastata ja tehdä
            tarjouksia. Valmis ilmoitus julkaistaan löydettäväksi Materiaalitorin
            ”Ilmoitukset”-sivulle.
          </p>
          <p>Ilmoitukseen voi lisätä kuvia ja muita ilmoitusta koskevia liitteitä.</p>

          <h3>6. Ilmoituksen muokkaaminen ja poistaminen</h3>

          <p>
            Julkaistu ilmoitus löytyy ”Omat ilmoitukset” –sivulta. Siellä ilmoitusta on mahdollista
            muokata tai sen voi poistaa, vaikka voimassaoloaikaa olisi vielä jäljellä.
          </p>

          <h3>7. Vastausten ja tarjousten vastaanottaminen ja niiden katselu</h3>

          <p>
            Ilmoitukseen tulleita vastauksia tai tarjouksia voi katsella ”Omat ilmoitukset”
            –sivulla. Tulleet tarjoukset voi hyväksyä tai hylätä. Yhteydenpito löydetyn kumppanin
            kanssa jatkuu tästä eteenpäin Materiaalitorin ulkopuolella.
          </p>

          <h3>8. Ilmoituksen poistuminen, arkistoituminen ja uudelleenjulkaisu</h3>

          <p>
            Ilmoitukset poistuvat julkaistujen ilmoitusten joukosta automaattisesti niiden
            voimassaolon päätyttyä. Voimassaoloaika voi olla enintään kuusi kuukautta. Poistuneet
            ilmoitukset arkistoituvat ilmoittajan omiin ilmoituksiin ja niitä on mahdollisuus
            julkaista sieltä tarvittaessa uudelleen.
          </p>

          <h3>Ohjeet aluekoordinaattoreille</h3>
          <p>1. Rekisteröityminen palveluun</p>
          <p>
            Rekisteröityessä valitaan rooliksi ”Aluekoordinaattori”, ja rekisteröidytään kuten yllä.
            Rekisteröityessäsi aluekoordinaattorina Motiva Oy kuitenkin tarkistaa ja hyväksyy
            rekisteröitymisesi.
          </p>
          <p>2. Ilmoitusten jättäminen muun kuin oman organisaatiosi nimissä</p>
          <p>
            Aluekoordinaattorina voit tehdä ilmoituksia myös muiden kuin oman organisaatiosi nimissä
            tarjottavista tai vastaanotettavista materiaaleista. Tällöin voit laittaa
            yhteystietokenttään tiedot yrityksestä, jonka puolesta ilmoitus on tehty. Voit myös
            toimia itse yhteyshenkilönä - ilmoittajan niin halutessa. Silloin materiaalia tarjoavaa
            tai haluavaa yritystä ei tarvitse mainita ilmoituksessa, mikäli yritys ei sitä halua.
            Yrityksen, jonka nimissä ilmoitus on tehty, tietoja voi ilmoittaa myös ilmoituksen
            vapaassa tekstikentässä.
          </p>
          <p>Aluekoordinaattori ei voi tehdä toisen yrityksen puolesta ilmoitusta jätteestä.</p>
        </>
      );
    }
  }
};

export default Ohjeet;
