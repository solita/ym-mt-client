import React from 'react';

const Saavutettavuusseloste = ({ lang, title }) => {
  switch (lang) {
    case 'sv-FI':
      return (
        <>
          <h1>{title}</h1>
          <p>
            Denna tillgänglighetsbeskrivning beskriver webbplatsen www.materiaalitori.fi, som ägs av
            miljöministeriet och administreras av Motiva Oy. Miljöministeriet strävar efter att
            garantera webbplatsens tillgänglighet i enlighet med EU:s direktiv 2016/2102 samt
            nationell lagstiftning. Webbplatsens nuvarande tillgänglighetsstandard är WCAG 2.1, nivå
            AA.
          </p>
          <p>
            Webbplatsen Materiaalitori.fi publicerades 8.4.2019. Kraven i tillgänglighetsdirektivet
            har beaktats från början av utvecklingen av webbplatsen. En utomstående expert har
            utvärderat webbplatsens tillgänglighet i maj 2019, och de brister som framkom i
            utvärderingen har åtgärdats. Tillgängligheten beaktas aktivt under den fortsatta
            utvecklingen av webbplatsen.
          </p>
          <h2>Status för tillgänglighet på webbplatsen Materiaalitori.fi</h2>
          <p>
            Webbplatsen uppfyller tillgänglighetskraven till stora delar, och webbplatsen har inga
            kritiska brister i tillgängligheten.
          </p>
          <p>På webbplatsen finns dock utrymme för förbättring i följande saker:</p>
          <ul>
            <li>textbeskrivningar av bilder och grafer</li>
            <li>kartapplikationens tillgänglighet</li>
          </ul>
          <p>
            Dessutom kan det förekomma tillgänglighetsbrister i bilagor som utomstående parter
            lämnar in, såsom bild- och PDF-filer.
          </p>
          <h2>Feedback och kontaktuppgifter</h2>
          <p>
            Om du upptäcker brister i frågor som rör webbplatsens tillgänglighet, kan du skicka
            feedback per e-post till adressen{' '}
            <a href="mailto:materiaalitori@motiva.fi">materiaalitori@motiva.fi</a>. Vi svarar på din
            feedback inom 14 dagar.
          </p>
          <h2>Anmälan till tillsynsmyndighet</h2>
          <p>
            Om du upptäcker problem med tillgängligheten på webbplatsen, ska du först ge feedback
            till oss.
          </p>
          <p>
            Om du inte är nöjd med svaret du fått eller om du inte får ett svar inom två veckor, kan
            du göra en anmälan till regionförvaltningsverket i Södra Finland. På webbplatsen för
            regionförvaltningsverket i Södra Finland finns en noggrann beskrivning av hur du kan
            göra en anmälan och hur ärendet handläggs.
          </p>
          <h3>Tillsynsmyndighetens kontaktuppgifter</h3>
          <p>
            Regionförvaltningsverket i Södra Finland
            <br />
            Enheten för webbtillgänglighetstillsyn
            <br />
            www.tillgänglighetskrav.fi
            <br />
            webbtillganglighet(a)rfv.fi
            <br />
            telefonnummer växel 0295 016 000
          </p>
          <footer>Denna beskrivning gjordes upp 17.10.2019.</footer>
        </>
      );

    default: {
      return (
        <>
          <h1>{title}</h1>
          <p>
            Tämä saavutettavuusseloste koskee ympäristöministeriön omistamaa ja Motiva Oy:n
            ylläpitämää www.materiaalitori.fi -sivustoa. Ympäristöministeriö pyrkii takaamaan
            sivuston saavutettavuuden EU:n direktiivin 2016/2102 sekä kansallisen lainsäädännön
            mukaisesti. Sivuston nykyinen saavutettavuusstandardi on WCAG 2.1, AA-taso.
          </p>
          <p>
            Materiaalitori.fi -sivusto on julkaistu 8.4.2019. Saavutettavuusdirektiivin vaatimukset
            on huomioitu sivuston kehittämisessä alusta alkaen. Sivuston saavutettavuutta on
            arvioitu ulkopuolisen asiantuntijan toimesta toukokuussa 2019, jonka arvioinnissa esiin
            tulleet puutteet on korjattu. Saavutettavuus huomioidaan aktiivisesti sivuston
            jatkokehitystyössä.
          </p>
          <h2>Materiaalitori.fi -sivuston saavutettavuuden tila</h2>
          <p>
            Sivusto täyttää suurelta osin saavutettavuusvaatimukset, eikä sivustolla ole kriittisiä
            saavutettavuuspuutteita.
          </p>
          <p>Sivustolla on kuitenkin parannettavaa seuraavissa asioissa:</p>
          <ul>
            <li>kuvien ja kuvaajien tekstikuvaukset</li>
            <li>karttasovelluksen saavutettavuus</li>
          </ul>
          <p>
            Lisäksi sivustolla julkaistavissa ulkopuolisen tahon toimittamissa liitetiedostoissa,
            kuten kuva- ja pdf-tiedostoissa, voi olla saavutettavuuspuutteita.
          </p>
          <h2>Palaute ja yhteystiedot</h2>
          <p>
            Jos huomaat puutteita sivuston saavutettavuuteen liittyvissä asioissa, voit laittaa
            palautetta sähköpostitse osoitteeseen{' '}
            <a href="mailto:materiaalitori@motiva.fi">materiaalitori@motiva.fi</a>. Vastaamme
            palautteeseesi 14 päivän sisällä.
          </p>
          <h2>Ilmoituksen tekeminen valvontaviranomaiselle</h2>
          <p>Jos huomaat sivustolla saavutettavuusongelmia, anna ensin palautetta meille.</p>
          <p>
            Jos et ole tyytyväinen saamaasi vastaukseen tai et saa vastausta lainkaan kahden viikon
            aikana, voit tehdä ilmoituksen Etelä-Suomen aluehallintovirastoon. Etelä-Suomen
            aluehallintoviraston sivulla kerrotaan tarkasti, miten ilmoituksen voi tehdä ja miten
            asia käsitellään.
          </p>
          <h3>Valvontaviranomaisen yhteystiedot</h3>
          <p>
            Etelä-Suomen aluehallintovirasto
            <br />
            Saavutettavuuden valvonnan yksikkö
            <br />
            <a href="http://www.saavutettavuusvaatimukset.fi">www.saavutettavuusvaatimukset.fi</a>
            <br />
            saavutettavuus(at)avi.fi
            <br />
            puhelinnumero vaihde 0295 016 000
          </p>
          <footer>Tämä seloste on laadittu 17.10.2019.</footer>
        </>
      );
    }
  }
};

export default Saavutettavuusseloste;
