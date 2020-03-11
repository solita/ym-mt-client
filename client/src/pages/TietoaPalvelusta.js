import React from 'react';
import tietoaPalvelusta from './Tietoa-palvelusta-materiaalitori-1-kuva-tiina-paju-web2.jpg';
import tietoaPalvelusta1 from './Tietoa-palvelusta-materiaalitori-2-kuva-tiina-paju-web2.jpg';
import tsvProsessi from './TSV-prosessi-materiaalitori-kuva-Tiina-Paju-web.png';
import tsvProsessiSv from './TSV-prosessi-materiaalitori-kuva-Tiina-Paju-web-sv-FI.png';
import { scrollToTop } from '../utils/common-utils';
import Icon from '../components/Icon/Icon';

const Ohjeet = ({ lang, title }) => {
  switch (lang) {
    case 'sv-FI':
      return (
        <>
          <h1>{title}</h1>

          <h3 id="materiaalitori">Materialtorget</h3>
          <p>
            Materialtorget är avsett för yrkesmässigt utbyte av företags och organisationers avfall
            och produktionsbiflöden. På Materialtorget kan man leta efter och erbjuda tillhörande
            tjänster, såsom avfallshanterings- och experttjänster.
          </p>
          <p>Materialtorget är avgiftsfritt och öppet för aktörerna i branschen.</p>
          <p>
            <a href="#kuka">Läs närmare vem tjänsten är riktad till.</a>
          </p>
          <img className="bigImage" src={tietoaPalvelusta} alt="Illustration" />
          <h3>Materialtorget påskyndar den cirkulära ekonomin och ge ökad öppenhet</h3>
          <p>
            I en cirkulär ekonomi maximeras cirkulationen av material och deras värde så att
            materialen hålls i kretslopp så länge som möjligt. Genom att använda
            återvinningsmaterial kan vi minska förbrukningen av naturresurser. Ett centralt syfte
            med Materialtorget är att främja återvinningen av avfall och biflöden samt cirkulär
            ekonomi genom att erbjuda en mötesplats för dels aktörer som erbjuder
            återvinningsmaterial, dels aktörer som är i behov av motsvarande material. Uppkomsten av{' '}
            <a href="#teollisetsymbioosit">industriell symbios</a> av detta slag är en förutsättning
            för att material ska cirkulera. Med hjälp av Materialtorget försöker man samla
            materialflöden som uppkommer i Finland till en och samma plats för att öka transparensen
            och för att nya sätt att utnyttja dem ska uppstå och nyttoanvändningen av material ska
            öka. Utvecklingen av en sådan återvinningsmarknad är nyckeln till att även
            återvinningsmaterialens värde ökar. Återvinningsmaterial borde oftare betraktas som
            värdefulla råvaror som ska hållas i omlopp så länge som möjligt.
          </p>
          <p>
            Målet är också att användningen av den kommunala{' '}
            <a href="#tsv"> avfallshanteringstjänst som tillhandahålls i andra hand</a>, och som det
            föreskrivs om i avfallslagen, ska blir mer transparent, likaså konstaterandet av
            bristande utbud av andra tjänster.
          </p>
          <p>
            Obs! Ändringen av avfallslagen som träder i kraft 1.1.2020 ålägger avfallsinnehavare att
            använda Materialtorget om de behöver en kommunalt ordnad avfallshanteringstjänst i andra
            hand till ett värde av minst 2 000 euro per år. Denna skyldighet börjar gälla offentliga
            avfallsinnehavare, dvs. upphandlande enheter, från och med 1.1.2021.
          </p>
          <img className="bigImage" src={tietoaPalvelusta1} alt="Illustration" />
          <h3 id="kuka">Vem kan använda tjänsten?</h3>
          <p>
            Materialtorget är tillgängligt för alla organisationer som har ett FO-nummer och som
            producerar eller utnyttjar avfall eller biflöden eller som erbjuder tillhörande
            tjänster. Tjänsten kan också användas av vissa myndigheter i skötseln av lagstadgade
            uppgifter. Tjänsten är åtminstone inte i det inledande skedet avsedd för privatpersoner.
          </p>
          <p>
            <strong>Din organisation är kanske intresserad av Materialtorget, om</strong>
          </p>
          <ul>
            <li>det i verksamheten uppkommer avfall eller biflöden som kan återvinnas</li>
            <li>du söker efter avfallshanteringstjänster eller experttjänster i branschen</li>
            <li>du tillhandahåller avfallshanteringstjänster eller experttjänster i branschen</li>
            <li>du letar efter material som kan återvinnas</li>
            <li>du eventuellt behöver en tjänst som kommunen är skyldig att ordna i andra hand</li>
            <li>
              du eventuellt tillhandahåller en tjänst som kommunen är skyldig att ordna i andra hand
            </li>
            <li>du följer eller övervakar kommunens tjänsteverksamhet (myndighet)</li>
          </ul>
          <p>
            Den person som registrerar sig måste för att få uträtta ärenden i organisationens namn
            ha fått tillstånd av den person som har rätt att teckna organisationens firma.
          </p>
          <h2 id="ymparistoluvista">
            Uppgifter om miljötillstånd och avfallshanteringsregistret hos den som tillhandahåller
            avfallshanteringstjänster
          </h2>
          <p>
            De avfallsmottagare som använder tjänsten ska ha ett godkännande enligt avfallslagen för
            att ta emot avfall.
          </p>
          <p>
            När avfallshanteringstjänster erbjuds på Materialtorget, till exempel transport eller
            behandling av avfall, är det bra för tjänsteleverantören att lägga till minst
            referensuppgifter om tillstånd och register i sina uppgifter. Med hjälp av dessa kan
            avfallsinnehavare utreda att de överlämnar avfallet till en behörig mottagare. Efter
            registrering i tjänsten är det möjligt att lägga till registerutdrag och kopior av
            tillstånd i organisationens uppgifter utöver referensuppgifterna. Tillstånds- och
            registeruppgifterna visas när man lägger in en annons om avfallshanteringstjänst,
            mottagning av material eller en offert lämnas om en annons om avfall.
          </p>
          <p>
            Enligt 29 § i avfallslagen (646/2011) får avfall i regel överlämnas till en aktör som
            har antecknats i avfallshanteringsregistret eller som har rätt att ta emot sådant avfall
            med stöd av ett miljötillstånd enligt miljöskyddslagen eller en registrering i
            datasystemet för miljövårdsinformation. Avfallsinnehavaren måste alltså vid behov senast
            när avfallet överlämnas försäkra sig om att avfallstransportören har antecknats i
            avfallshanteringsregistret och att den som behandlar avfallet har rätt att ta emot det
            aktuella avfallet.
          </p>
          <p>
            Referensuppgifter och kopior som anmälts till Materialtorget gör inte att
            avfallsinnehavarens skyldighet att vid behov kontrollera dessa tillstånds- och
            registeruppgifter upphör.
          </p>
          <p className="ScrollToTop">
            <button className="ScrollToTop__button" onClick={scrollToTop}>
              <Icon name="Arrow" classes="ScrollToTop__button__svg" />
              Till början av sidan
            </button>
          </p>
          <h2 id="tsv">Kommunal avfallshantering i andra hand</h2>
          <h3>Kommunens skyldighet att ordna avfallshantering</h3>
          <p>
            Enligt 32 § i avfallslagen (646/2011) är kommunen i regel skyldig att ordna
            avfallshantering för avfall som uppkommer vid boende samt för kommunalt avfall från
            kommunens förvaltnings- och serviceverksamhet. Kommunen har även ansvar gällande
            mottagning och behandling av farligt avfall.
          </p>
          <p>
            Enligt 33 § i avfallslagen är kommunen skyldig att ordna avfallshantering i andra hand
            även för annat avfall än sådant som den i första handa ansvarar för. En förutsättning
            för denna avfallshantering i andra hand är emellertid att avfallsinnehavaren begär det
            på grund av bristande privat utbud av tjänster och att avfallet till sin beskaffenhet
            och mängd lämpar sig för transport eller behandling i kommunens avfallshanteringssystem.
            Syftet med kommunal avfallshantering i andra hand är att trygga en fungerande
            avfallshantering och tillgången till avfallshanteringstjänster även när övrigt
            tjänsteutbud inte finns att tillgå.
          </p>
          <p>
            Förfaranden gällande kommunal avfallshantering i andra hand preciseras i och med den
            ändring av avfallslagen (438/2019) som träder i kraft i början av år 2020. De
            grundläggande förutsättningarna för tjänsten förblir oförändrade. Lagändringen
            förutsätter att en avfallsinnehavare ska använda Materialtorget för att visa bristande
            annat tjänsteutbud när värdet på den kommunala avfallshantering i andra hand som behövs
            är minst 2 000 euro per år. I detta fall görs också begäran om en kommunal tjänst via
            Materialtorget. Begäran kan i fortsättningen framföras även till avfallsinnehavaren av
            ett företag som tillhandahåller en avfallshanteringstjänst.
          </p>
          <p>Om kommunal avfallshantering i andra hand används även förkortningen TSV-tjänst.</p>
          <h3>
            Användning av Materialtorget i samband med kommunal avfallshantering i andra hand från
            och med 1.1.2020
          </h3>
          <img
            className="bigImage"
            src={tsvProsessiSv}
            alt="Illustration om användning av Materialtorget i samband med kommunal avfallshantering i andra hand"
          />
          <p>
            <strong>A) Användningen av Materialtorget är i huvudsak frivillig.</strong> Om
            avfallsinnehavaren har vetskap om en lämplig tjänsteleverantör, kan man avtala om
            tjänsten direkt, och Materialtorget behöver inte användas. Då finns inte heller ett
            behov av en kommunal tjänst i andra hand. Även om en tjänsteleverantör skulle vara känd,
            an man på Materialtorget till exempel konkurrensutsätta tjänsteleverantörer eller
            försöka hitta en tjänst som bättre stämmer överens med prioriteringsordningen i
            avfallslagen.
          </p>
          <p>
            <strong>
              B) Om en tjänsteleverantör inte är känd, ska avfallsinnehavaren registrera dig i
              Materialtorget.
            </strong>
          </p>
          <ol>
            <li>
              1) Avfallsinnehavaren kan söka en lämplig tjänsteleverantör i annonserna på
              Materialtorget. Om en lämplig tjänsteleverantör hittas, behöver man inte nödvändigtvis
              göra en egen annons. Då finns inte heller ett behov av en kommunal tjänst i andra
              hand.
            </li>

            <li>
              2) Avfallsinnehavaren ska göra upp en annons om sitt avfall och den tjänst som behövs
              åtminstone när värdet på den kommunala avfallshantering i andra hand som behövs är
              minst 2 000 euro per år. Annonsen kan också göras upp av ett företag som
              tillhandahåller avfallshantering för avfallsinnehavarens räkning när begäran gäller
              behandling av avfall. Materialtorget handleder användaren att välja rätt annonstyp, då
              det är lätt att göra upp annonsen så att den stämmer överens med kraven i
              avfallslagstiftningen. Annonsen ska publiceras för minst 14 dygn.
            </li>

            <li>
              3) På Materialtorget är det möjligt att få offerter om tjänster. Om offerterna fås
              också e-postaviseringar. Lämpligheten och skäligheten i inkomna offerter bedöms och
              offerterna kan antingen godkännas eller avslås. Om en lämplig tjänsteleverantör
              hittas, finns det inte ett behov av en kommunal tjänst i andra hand.
            </li>

            <li>
              4) Om inga offerter inkommer om annonsen eller om de avslås för att de är olämpliga,
              meddelar Materialtorget om möjligheten att göra e begäran om en tjänst i andra hand
              via Materialtorget. Eventuella avslag ska motiveras. Den som framför begäran väljer
              vilken avfallsanläggning som begäran ska skickas till. Avfallsanläggningen ser
              bedömningen av bristande utbud av tjänster samt bedömer huruvida avfallet lämpar sig
              för kommunens avfallshanteringssystem.
            </li>

            <li>
              5) Den kommunala avfallsanläggningen ska ingå ett avtal med avfallsinnehavaren eller
              ett företag som tillhandahåller avfallshanteringstjänster till innehavaren. Avtalet
              får gälla högst tre år i sänder. Dessutom kan parterna säga upp avtalet efter en
              uppsägningstid som fastställs i avtalet. Avtalet kan göras på Materialtorget med hjälp
              av en färdig avtalsmall.
            </li>

            <li>
              6) Alternativt kan ett avtal om en tjänst i andra hand göras utanför Materialtorget,
              då den kommunala avfallsanläggningen ska lämna in uppgifter om avtalet till
              Materialtorget senast 14 dygn från det att avtalet ingicks.
            </li>
          </ol>
          <p>
            Skyldigheten att använda Materialtorget gäller inte en tjänst i andra hand, där det
            årliga värdet är under 2 000 euro. I det fallet kan avfallsinnehavaren anvisa en begäran
            om tjänsten direkt till den kommunala avfallsanläggningen. I dessa fall behöver inget
            avtal om tjänsten ingås. Den kommunala avfallsanläggningen ska dock årligen lämna in
            uppgifter till Materialtorget även om sådana tjänster. Dessutom kan en avfallsinnehavare
            använda Materialtorget om så önskas, trots att värdet på tjänsten i andra hand skulle
            understiga 2 000 euro.
          </p>
          <p>
            Användning av Materialtorget förutsätts inte heller i oförutsedda och brådskande
            situationer, trots att värdet på tjänsten i andra hand som behövs skulle vara minst
            2 000 euro. Det kan bli frågan om till exempel olika olycksfall, oförutsedda dröjsmål i
            tillgången till avfallshanteringstjänster eller andra situationer där avfallet
            omedelbart måste fås för behörig behandling. De i lagen om offentlig upphandling och
            koncession (1397/2016) avsedda upphandlande enheterna är skyldiga att använda
            Materialtorget när andra villkor uppfylls från och med början av år 2021. I nämnda
            situationer kan begäran om en tjänst i andra hand riktas på ovan nämnt sätt direkt till
            den kommunala avfallsanläggningen och ett avtal behöver inte ingås om tjänsten. Likaså
            ska kommunen årligen lämna i uppgifter om sådana tjänster till Materialtorget.
          </p>
          <h3>Gällande avtal om kommunal avfallshantering i andra hand </h3>
          <p>
            Avtal som ingåtts om kommunal avfallshantering i andra hand som ingåtts innan ändringen
            av avfallslagen träder i kraft gäller till utgången av avtalsperioden och på dem
            tillämpas bestämmelser som gällt före ändringen. Med andra ord behöver gällande avtal
            inte sägas upp på grund av lagändringen och en tjänst som tillhandahålls med stöd av
            avtalen förutsätter inte att Materialtorget används. Ett avtal om en tjänst i andra hand
            ska före ändringen av avfallslagen göras om tjänster som behövs kontinuerligt och
            regelbundet och avtalet får gälla i högst tre år i sänder. I praktiken slutar dessa
            avtal därför stegvis under de tre år som följer efter ändringen av avfallslagen. När
            avtalet går ut ska avfallsinnehavaren när andra förutsättningar uppfylls använda
            Materialtorget för att söka avfallshanteringstjänster som behövs.
          </p>
          <h3>Myndigheters rätt att få uppgifter</h3>
          <p>
            Vissa myndigheter har rätt att få uppgifter från Materialtorget om kommunal
            avfallshantering i andra hand för att sköta sina lagstadgade uppgifter. Rätten att få
            uppgifter gäller väsentliga uppgifter relaterade till tjänsten, som avtal, mottagna
            offerter och deras avslagsgrunder samt uppgifter gällande begäranden om tjänster.
            Uppgifterna underlättar uppföljningen av kommunal avfallshantering i andra hand.
            Kommunens avfallshanteringsmyndighet och miljöskyddsmyndighet, närings-, trafik- och
            miljöcentralen samt Konkurrens- och konsumentverket ska ha rätt att få uppgifter.
          </p>
          <h2 id="teollisetsymbioosit">Industriell symbios i Finland – FISS</h2>
          <p>
            Industriell symbios i Finland – FISS (Finnish Industrial Symbiosis System) är en
            verksamhetsmodell som bygger på samarbete och där man försöker hjälpa företag och andra
            aktörer att effektivisera det ömsesidiga utnyttjandet av resurser samt skapa ny
            affärsverksamhet.
          </p>
          <p>
            I en symbios producerar företagen mervärde åt varandra genom att effektivt utnyttja
            varandras biflöden, teknologi, kunnande eller tjänster. På det sättet blir en aktörs
            biflöde eller avfall en lönsam resurs för en annan aktör, medför inbesparingar för båda
            parterna och minskar även skadlig miljöpåverkan. I symbios uppkommer i bästa fall
            kommersiellt framgångsrika produkter med en hög förädlingsgrad för slutanvändarnas behov
            såväl i hemlandet som på den internationella marknaden.
          </p>
          <p>
            FISS-modellen bygger på ett aktivt symbiosfrämjande arbete, dvs. facilitering och
            gemensam utveckling. Målet är också att höja materialens förädlingsvärde och skapa nya,
            konkurrenskraftiga produkter och tjänster.
          </p>
          <h3>FISS-organisering</h3>
          <p>
            Motiva Oy samordnar FISS-modellen i Finland och sammanställer ett nätverk med regionala
            aktörer för att sammanföra aktörer som erbjuder resurser och aktörer som behöver
            resurser på fältet.
          </p>
          <p>
            Områdeskoordinatorerna utför ett symbiosfrämjande arbete tillsammans med företag och
            andra aktörer. I deras uppgifter ingår att aktivera och engagera företag, utbyta
            information och skapa nätverk om resurser samt förverkliga en symbios. FISS-verkstäderna
            är en central metod för att aktivera företag, samla in resursinformation och identifiera
            synergier.
          </p>
          <p>
            Regionala organisatörer sparrar företag i att identifiera och skapa idéer om nya
            synergi- och affärsmöjligheter samt förverkliga synergier i praktiken. De hjälper också
            företag att hitta samarbetspartner.
          </p>
          <p>
            Materialtorget är en del av verksamheten inom industriell symbios. På Materialtorget kan
            man annonsera om resurser som är tillgängliga eller som behövs eller tjänster i
            anslutning till dessa. Områdeskoordinatorerna hjälper till att åstadkomma industriell
            symbios.
          </p>
          <p>
            Mer information om FISS-verksamheten och områdeskoordinatorernas kontaktuppgifter:{' '}
            <a href="https://www.teollisetsymbioosit.fi">www.teollisetsymbioosit.fi</a>
          </p>
          <p className="ScrollToTop">
            <button className="ScrollToTop__button" onClick={scrollToTop}>
              <Icon name="Arrow" classes="ScrollToTop__button__svg" />
              Till början av sidan
            </button>
          </p>
        </>
      );

    default: {
      return (
        <>
          <h1>{title}</h1>
          <h3 id="materiaalitori">Materiaalitori</h3>
          <p>
            Materiaalitori on tarkoitettu yritysten ja organisaatioiden jätteiden ja tuotannon
            sivuvirtojen ammattimaiseen vaihdantaan. Materiaalitorissa voi myös etsiä ja tarjota
            näihin liittyviä palveluja, kuten jätehuolto- ja asiantuntijapalveluja.
          </p>
          <p>Materiaalitorin käyttäminen on maksutonta ja avointa alan toimijoille.</p>
          <p>
            <a href="#kuka">Lue tarkemmin kenelle palvelu on suunnattu.</a>
          </p>
          <img className="bigImage" src={tietoaPalvelusta} alt="Kuvituskuva" />
          <h3>Materiaalitori vauhdittaa kiertotaloutta ja lisää läpinäkyvyyttä</h3>
          <p>
            Kiertotaloudessa pyritään maksimoimaan materiaalien ja niiden arvon säilyminen kierrossa
            mahdollisimman pitkään. Kierrätysmateriaaleja käyttämällä voidaan vähentää
            luonnonvarojen kulutusta. Materiaalitorin keskeinen tavoite on edistää jätteiden ja
            sivuvirtojen hyötykäyttöä ja kiertotaloutta tarjoamalla alan toimijoille
            kohtaamispaikka, jossa kierrätysmateriaalien tarjoajat ja tarvitsijat voivat löytää
            toisensa. Tällaisten <a href="#teollisetsymbioosit">teollisten symbioosien</a>{' '}
            syntyminen on edellytys materiaalien kierrolle. Materiaalitorin avulla pyritään
            keräämään Suomessa syntyvät materiaalivirrat näkyvämmiksi yhteen paikkaan, jotta niiden
            ympärille syntyisi uusia hyödyntämistapoja ja materiaalit päätyisivät yhä enemmän
            hyötykäyttöön. Tällaisten kierrätysmarkkinoiden kehittyminen on avain sille, että myös
            kierrätysmateriaalien arvo kasvaa. Kierrätysmateriaalit tulisi nähdä yhä enemmän
            arvokkaina raaka-aineina, jotta ne pysyisivät kierrossa mahdollisimman pitkään.
          </p>
          <p>
            Tavoitteena on myös tuoda läpinäkyvyyttä jätelaissa säädetyn{' '}
            <a href="#tsv">kunnan toissijaisen jätehuoltopalvelun</a> käyttöön ja sen edellytyksenä
            olevan muun palvelutarjonnan puutteen osoittamiseen.
          </p>
          <p>
            Huom! 1.1.2020 voimaan tuleva jätelain uudistus velvoittaa Materiaalitorin käyttöön
            sellaiset jätteen haltijat, jotka tarvitsevat kunnan toissijaista jätehuoltopalvelua
            vuodessa yli 2000 euron arvosta. Julkisia jätteen haltijoita eli hankintayksiköitä
            velvollisuus koskee 1.1.2021 alkaen.
          </p>
          <img className="bigImage" src={tietoaPalvelusta1} alt="Kuvituskuva" />
          <h3 id="kuka">Kuka voi asioida palvelussa?</h3>
          <p>
            Materiaalitorissa voivat tällä hetkellä asioida y-tunnuksen omaavat organisaatiot, jotka
            tuottavat tai hyödyntävät jätteitä tai sivuvirtoja tai tarjoavat näihin liittyviä
            palveluja. Lisäksi palvelua voivat käyttää eräät viranomaiset lainmukaisten tehtäviensä
            hoitoon. Palvelu ei ole ainakaan ensivaiheessa tarkoitettu yksityishenkilöille.
          </p>
          <p>
            <strong>Organisaatiotasi voi kiinnostaa Materiaalitorissa asiointi, mikäli</strong>
          </p>
          <ul>
            <li>toiminnassasi syntyy jätteitä tai sivuvirtoja hyödynnettäväksi</li>
            <li>etsit jätehuolto- tai asiantuntijapalveluja</li>
            <li>tarjoat jätehuolto- tai asiantuntijapalveluja</li>
            <li>etsit hyödynnettäviä materiaaleja</li>
            <li>saattaisit tarvita kunnan toissijaiseen vastuuseen perustuvaa palvelua (TSV)</li>
            <li>tarjoat kunnan toissijaiseen vastuuseen perustuvaa palvelua (TSV)</li>
            <li>seuraat tai valvot kunnan palvelutoimintaa (viranomainen)</li>
          </ul>
          <p>
            Rekisteröityvällä henkilöllä tulee olla organisaation nimenkirjoitusoikeudellisen
            henkilön lupa asioida palvelussa organisaation nimiin.
          </p>
          <h2 id="ymparistoluvista">
            Jätehuoltopalveluiden tarjoajan tiedot ympäristöluvista ja jätehuoltorekisteristä
          </h2>
          <p>
            Palvelua käyttävillä jätteen vastaanottajilla on oltava jätelainmukainen hyväksyntä
            vastaanottaa jätettä.
          </p>
          <p>
            Kun Materiaalitorissa tarjotaan jätehuoltopalveluja, kuten jätteen kuljetusta tai
            käsittelyä, on palvelun tarjoajan hyvä lisätä tietoihinsa vähintään lupien ja
            rekistereiden viitetiedot, joiden avulla jätteen haltija voi selvittää, että luovuttaa
            jätteen asianmukaiselle vastaanottajalle. Palveluun rekisteröitymisen jälkeen
            organisaation tietoihin on mahdollista lisätä viitetietojen lisäksi rekisteriotteita ja
            kopioita luvista. Lisätyt lupa- ja rekisteritiedot näkyvät, kun tehdään ilmoitus
            jätehuoltopalvelusta, materiaalin vastaanottamisesta tai tehdään tarjous jätteestä
            tehtyyn ilmoitukseen.
          </p>
          <p>
            Jätelain (646/2011) 29 §:n mukaan jätteen saa luovuttaa pääsääntöisesti toimijalle, joka
            on merkitty jätehuoltorekisteriin tai jolla on ympäristöluvan tai ympäristönsuojelun
            tietojärjestelmän rekisteröinnin perusteella oikeus ottaa vastaan kyseistä jätettä.
            Jätteen haltijan on siis tarvittaessa varmistettava viimeistään jätettä luovuttaessaan,
            että jätteen kuljettaja on merkitty jätehuoltorekisteriin ja jätteen käsittelijällä on
            oikeus vastaanottaa kyseistä jätettä.
          </p>
          <p>
            Materiaalitoriin ilmoitetut viitetiedot ja kopiot eivät poista jätteen haltijan
            velvollisuutta tarkistaa tarvittaessa kyseiset lupa- ja rekisteritiedot.
          </p>
          <p className="ScrollToTop">
            <button className="ScrollToTop__button" onClick={scrollToTop}>
              <Icon name="Arrow" classes="ScrollToTop__button__svg" />
              Sivun alkuun
            </button>
          </p>
          <h2 id="tsv">Kunnan toissijainen jätehuoltopalvelu (TSV) </h2>
          <h3>Kunnan velvollisuus järjestää jätehuolto</h3>
          <p>
            Jätelain (646/2011) 32 §:n mukaan kunta on velvollinen järjestämään pääsääntöisesti
            asumisessa syntyvän jätteen sekä kunnan hallinto- ja palvelutoiminnassa syntyvän
            yhdyskuntajätteen jätehuollon. Kunnalla on lisäksi vaaralliseen jätteen vastaanottoon ja
            käsittelyyn liittyviä vastuita.
          </p>
          <p>
            Kunta on jätelain 33 §:n mukaan velvollinen järjestämään jätehuollon toissijaisesti myös
            muulle jätteelle, kuin sille josta se on ensisijaisesti vastuussa. Tämän toissijaisen
            jätehuoltopalvelun edellytyksenä kuitenkin on, että jätteen haltija pyytää sitä
            yksityisen palveluntarjonnan puutteen vuoksi ja että jäte laadultaan ja määrältään
            soveltuu kuljetettavaksi tai käsiteltäväksi kunnan jätehuoltojärjestelmässä. Kunnan
            toissijaisen jätehuoltopalvelun avulla pyritään turvaamaan toimiva jätehuolto ja
            jätehuoltopalveluiden saatavuus silloinkin, kun muuta palvelutarjontaa ei ole
            saatavilla.
          </p>
          <p>
            Kunnan toissijaiseen jätehuoltopalveluun liittyvät menettelyt täsmentyvät vuoden 2020
            alussa voimaantulevan jätelain muutoksen (438/2019) myötä. Palvelun perusedellytykset
            säilyvät samoina. Lainmuutos edellyttää, että jätteen haltijan tulee käyttää
            Materiaalitoria muun palvelutarjonnan puutteen osoittamiseen silloin, kun tarvittavan
            kunnan toissijaisen jätehuoltopalvelun arvo on vähintään 2 000 euroa vuodessa. Tällöin
            myös pyyntö kunnan palvelusta tehdään Materiaalitorin kautta. Pyynnön voi jatkossa
            esittää myös jätteen haltijalle jätehuoltopalvelua tarjoava yritys.
          </p>
          <p>Kunnan toissijaista jätehuoltopalvelusta käytetään myös lyhennettä TSV-palvelu.</p>
          <h3>
            Materiaalitorin käyttäminen kunnan toissijaisen jätehuoltopalvelun yhteydessä 1.1.2020
            alkaen
          </h3>
          <img
            className="bigImage"
            src={tsvProsessi}
            alt="Kuvituskuva Materiaalitorin käyttämisestä
            kunnan toissijaisen jätehuoltopalvelun yhteydessä"
          />
          <p>
            <strong>A) Materiaalitorin käyttö on pääosin vapaaehtoista.</strong> Mikäli jätteen
            haltijalla on tiedossa sopiva palveluntarjoaja, voi palvelusta sopia suoraan, eikä
            Materiaalitoria tarvitse käyttää. Tällöin ei myöskään ole tarvetta kunnan toissijaiselle
            palvelulle. Vaikka palveluntarjoaja olisi tiedossa, voi Materiaalitorissa kuitenkin
            esimerkiksi kilpailuttaa palveluntarjoajia tai pyrkiä etsimään jätelain
            etusijajärjestyksen mukaisempaa palvelua.
          </p>
          <p>
            <strong>
              B) Mikäli palveluntarjoajaa ei ole tiedossa, jätteen haltija rekisteröityy
              Materiaalitoriin.
            </strong>
          </p>
          <ol>
            <li>
              1) Jätteen haltija voi etsiä sopivaa palveluntarjoajaa Materiaalitorissa olevista
              ilmoituksesta. Jos sopiva palveluntarjoaja löytyy, ei omaa ilmoitusta välttämättä
              tarvitse tehdä. Tällöin ei myöskään ole tarvetta kunnan toissijaiselle palvelulle.
            </li>

            <li>
              2) Jätteen haltija tekee ilmoituksen jätteestään ja tarvitsemastaan palvelusta
              ainakin, kun tarvittavan kunnan toissijaisen jätehuoltopalvelun arvo on vähintään 2
              000 euroa vuodessa. Ilmoituksen voi myös tehdä jätteen haltijalle jätehuoltopalvelua
              tarjoava yritys, kun pyyntö koskee jätteen käsittelyä. Materiaalitori ohjaa
              valitsemaan oikean ilmoitustyypin, jolloin ilmoituksesta on helppo tehdä
              jätelainsäädännön vaatimusten mukainen. Ilmoitus tulee julkaista vähintään 14
              vuorokaudeksi.
            </li>

            <li>
              3) Materiaalitorissa on mahdollista saada tarjouksia palveluista. Tarjouksista saa
              myös sähköposti-ilmoituksen. Tulleiden tarjousten sopivuus ja kohtuullisuus arvioidaan
              ja tarjoukset voidaan joko hyväksyä tai hylätä. Mikäli sopiva palveluntarjoaja löytyy,
              ei ole tarvetta kunnan toissijaiselle palvelulle.
            </li>

            <li>
              4) Mikäli ilmoitukseen ei tule yhtään tarjousta tai ne hylätään sopimattomina,
              Materiaalitori ilmoittaa mahdollisuudesta tehdä pyyntö toissijaisesta palvelusta
              Materiaalitorin kautta. Mahdolliset hylkäykset on perusteltava. Pyynnön tekijä
              valitsee, mille jätelaitokselle pyyntö lähtee. Jätelaitos näkee palvelutarjonnan
              puutteen arvioinnin sekä arvioi jätteen soveltumisen kunnan jätehuoltojärjestelmään.
            </li>

            <li>
              5) Kunnan jätelaitoksen tulee tehdä jätteen haltijan tai tälle jätehuoltopalveluja
              tarjoavan yrityksen kanssa sopimus palvelusta. Sopimuksen kesto voi olla enintään
              kolme vuotta kerrallaan. Lisäksi osapuolet voivat irtisanoa sopimuksen siinä
              määritellyn irtisanomisajan kuluttua. Sopimus voidaan tehdä Materiaalitorissa
              hyödyntämällä sen valmista sopimusmallia.
            </li>

            <li>
              6) Vaihtoehtoisesti sopimus toissijaisesta palvelusta voidaan tehdä Materiaalitorin
              ulkopuolella, jolloin kunnan jätelaitoksen on toimitettava sopimusta koskevat tiedot
              Materiaalitoriin viimeistään 14 vuorokauden kuluttua sopimuksen tekemisestä.
            </li>
          </ol>
          <p>
            Velvollisuus käyttää Materiaalitoria ei koske toissijaista palvelua, jonka vuosittainen
            arvo on alle 2 000 euroa. Jätteen haltija voi tällöin osoittaa palvelua koskevan pyynnön
            suoraan kunnan jätelaitokselle. Palvelusta ei näissä tapauksissa tarvitse tehdä
            sopimusta. Kunnan jätelaitoksen tulee kuitenkin vuosittain toimittaa Materiaalitoriin
            tiedot myös tällaisesta palvelusta. Lisäksi jätteen haltija voi halutessaan käyttää
            Materiaalitoria, vaikka tarvittavan toissijaisen palvelun arvo jäisi alle 2 000 euron.
          </p>
          <p>
            Materiaalitorin käyttöä ei edellytetä myöskään ennakoimattomissa kiiretilanteissa,
            vaikka tarvittavan toissijaisen palvelun arvo sinänsä olisi vähintään 2 000 euroa.
            Kyseeseen voivat tulla esimerkiksi erilaiset onnettomuustilanteet, jätehuoltopalveluiden
            saatavuudessa ilmenevät ennalta arvaamattomat viiveet tai muut tilanteet, joissa jäte on
            saatava välittömästi asianmukaiseen käsittelyyn. Lisäksi julkisista hankinnoista ja
            käyttöoikeussopimuksista annetussa laissa (1397/2016) tarkoitetut hankintayksiköt ovat
            velvollisia käyttämään Materiaalitoria muiden edellytysten täyttyessä vuoden 2021 alusta
            lähtien. Mainituissa tilanteissa pyyntö toissijaisesta palvelusta voidaan osoittaa
            edellä mainituin tavoin suoraan kunnan jätelaitokselle eikä palvelusta tarvitse tehdä
            sopimusta. Samoin kunnan tulee toimittaa vuosittain tiedot tällaisesta palvelusta
            Materiaalitoriin.
          </p>
          <h3>Voimassaolevat sopimukset kunnan toissijaisesta jätehuoltopalvelusta </h3>
          <p>
            Ennen jätelain muutoksen voimaantuloa tehdyt sopimukset kunnan toissijaisesta
            jätehuoltopalvelusta ovat voimassa sopimuskauden loppuun ja niihin sovelletaan ennen
            muutosta voimassa olleita säännöksiä. Voimassa olevia sopimuksia ei toisin sanoen
            tarvitse lainmuutoksen vuoksi irtisanoa eikä niiden nojalla annettava palvelu edellytä
            Materiaalitorin käyttöä. Sopimus toissijaisesta palvelusta tulee ennen jätelain muutosta
            tehdä jatkuvasti ja säännöllisesti tarvittavasta palvelusta ja sopimuksen kesto voi olla
            enintään kolme vuotta kerrallaan. Käytännössä nämä sopimukset päättyvät siten
            vaiheittain jätelain muutosta seuraavien kolmen vuoden aikana. Sopimuksen päättyessä
            jätteen haltijan on muiden edellytysten täyttyessä käytettävä Materiaalitoria
            tarvitsemiensa jätehuoltopalveluiden etsimiseen.
          </p>
          <h3>Viranomaisten tiedonsaantioikeus</h3>
          <p>
            Eräillä viranomaisilla on oikeus saada Materiaalitorista tietoja kunnan toissijaisesta
            jätehuoltopalvelusta lakiin perustuvien tehtäviensä hoitamiseksi. Tiedonsaantioikeus
            koskee palveluun liittyviä olennaisia tietoja, kuten sopimuksiin, vastaanotettuihin
            tarjouksiin ja niiden hylkäämisperusteisiin sekä palvelupyyntöihin liittyviä tietoja.
            Tiedot helpottavat kunnan toissijaisen jätehuoltopalvelun seurantaa. Tiedonsaantioikeus
            olisi kunnan jätehuoltoviranomaisella ja ympäristönsuojeluviranomaisella, elinkeino-,
            liikenne- ja ympäristökeskuksilla sekä Kilpailu- ja kuluttajavirastolla.
          </p>
          <h2 id="teollisetsymbioosit">Teolliset symbioosit Suomessa - FISS</h2>
          <p>
            Teolliset symbioosit Suomessa – FISS (Finnish Industrial Symbiosis System) on
            yhteistyöhön perustuva toimintamalli, jolla pyritään auttamaan yrityksiä ja muita
            toimijoita tehostamaan keskinäistä resurssien hyödyntämistä sekä synnyttämään uutta
            liiketoimintaa.
          </p>
          <p>
            Symbiooseissa yritykset tuottavat toisilleen lisäarvoa hyödyntämällä tehokkaasti
            toistensa sivuvirtoja, teknologiaa, osaamista tai palveluja. Näin toisen toimijan
            sivuvirta tai jäte muuttuu tuottavaksi resurssiksi toiselle ja säästää kummankin
            kustannuksia vähentäen myös haitallisia ympäristövaikutuksia. Parhaimmassa tapauksessa
            symbiooseissa syntyy kaupallisesti menestyviä korkean jalostusasteen tuotteita
            loppukäyttäjien tarpeisiin sekä kotimaassa että kansainvälisillä markkinoilla.
          </p>
          <p>
            FISS-malli perustuu aktiiviseen symbioosien edistämiseen eli fasilitointiin ja
            yhteiskehittämiseen. Tavoitteena on myös nostaa materiaalien jalostusarvoa ja luoda
            uusia kilpailukykyisiä tuotteita ja palveluita.
          </p>
          <h3>FISS-organisointi </h3>
          <p>
            Motiva Oy koordinoi FISS-mallia Suomessa ja kokoaa alueellisten toimijoiden verkostoa
            yhdistämään resurssien tarjoajat ja tarvitsijat kentällä.
          </p>
          <p>
            Aluekoordinaattorit tekevät symbioosien edistämistyötä yhdessä yritysten ja muiden
            toimijoiden kanssa. Heidän tehtäviinsä kuuluu yritysten aktivointi ja sitouttaminen,
            resurssitiedon vaihto ja verkottaminen sekä symbioosien toteuttaminen. FISS-työpajat
            toimivat keskeisenä keinona yritysten aktivoinnissa, resurssitiedon keräämisessä ja
            synergioiden tunnistamisessa.
          </p>
          <p>
            Alueelliset organisoijat sparraavat yrityksiä uusien synergia- ja
            liiketoimintamahdollisuuksien tunnistamisessa ja ideoinnissa, sekä synergioiden
            käytännön toteuttamisessa. He myös auttavat yrityksiä löytämään tarvittavia
            yhteistyökumppaneita.
          </p>
          <p>
            Materiaalitori on osa teollisten symbioosien toimintaa. Materiaalitorissa voi ilmoittaa
            tarjolla olevista ja tarvitsemistaan resursseista tai näihin liittyvistä palveluista.
            Aluekoordinaattorit auttavat teollisten symbioosien aikaan saamisessa.
          </p>
          <p>
            Lisää tietoa FISS-toiminnasta ja aluekoordinaattoreiden yhteystiedot:{' '}
            <a href="https://www.teollisetsymbioosit.fi">www.teollisetsymbioosit.fi</a>
          </p>
          <p className="ScrollToTop">
            <button className="ScrollToTop__button" onClick={scrollToTop}>
              <Icon name="Arrow" classes="ScrollToTop__button__svg" />
              Sivun alkuun
            </button>
          </p>
        </>
      );
    }
  }
};

export default Ohjeet;
