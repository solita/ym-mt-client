import React from 'react';

const Faq = ({ lang, title }) => {
  switch (lang) {
    case 'sv-FI':
      return (
        <>
          <h1>{title}</h1>

          <h2>Tjänst</h2>

          <h3>Hur loggar jag in till Materialtorget?</h3>

          <p>
            Inloggning till Materialtorget görs genom att uppe till höger på huvudsidan välja Logga
            in/Registrera dig, vilket tar dig till inloggningssidan. Du kan logga in med ett
            personligt användarnamn och lösenord, vilka fastställs i samband med registrering i
            tjänsten. Registreringen görs på samma sida. Registreringen görs via Suomi.fi-tjänsten
            och för registreringen behöver du FO-numret för den organisation som du representerar.
          </p>

          <h3>Varför kräver tjänsten stark autentisering?</h3>

          <p>
            Med hjälp av stark autentisering via tjänsten suomi.fi säkerställs användarens riktiga
            identitet för att förebygga missbruk.
          </p>

          <h3>Jag har inget FO-nummer. Kan jag använda tjänsten?</h3>

          <p>Tjänsten är avsedd endast för företag och organisationer som har ett FO-nummer.</p>

          <h3>Jag har glömt mitt användarnamn och lösenord. Vad ska jag göra?</h3>

          <p>Din e-postadress är ditt användarnamn.</p>
          <p>
            Du får ett nytt lösenord i stället för det som glömts bort genom att välja tjänsten ”Har
            du glömt ditt lösenord?” på inloggningssidan. Länken för att uppdatera lösenordet
            skickas till din e-postadress.
          </p>

          <h3>Finns det avgifter i tjänsten?</h3>

          <p>Det är avgiftsfritt att använda Materialtorget.</p>

          <h3>Finns det ett öppet gränssnitt för tjänsten?</h3>

          <p>
            Ett öppet gränssnitt håller på att skapas för tjänsten. Gränssnittsbeskrivningen blir
            tillgänglig om en tid.
          </p>

          <h3>Vilka är områdeskoordinatorerna?</h3>

          <p>
            Områdeskoordinatorerna är personer och organisationer inom verksamhetsmodellen
            Industriell symbios, vilka har till uppgift att främja utnyttjandet av biflöden i
            företagens verksamhet. Mer information om verksamheten och områdeskoordinatorernas
            kontaktuppgifter finns på webbplatsen{' '}
            <a href="http://teollisetsymbioosit.fi">www.teollisetsymbioosit.fi</a>.
            Områdeskoordinatorerna kan lägga in annonser för organisationernas räkning, om man har
            kommit överens om det.
          </p>

          <h2>Annonser</h2>

          <h3>Vilka material och tjänster kan jag annonsera?</h3>

          <p>
            I tjänsten kan du annonsera alla slags avfall eller biflöden som uppkommer i din
            verksamhet. Även material som produktifierats av avfall eller biflöden kan erbjudas via
            tjänsten.
          </p>
          <p>
            I tjänsteannonser kan du annonsera tjänster gällande transport, behandling och lagring
            av avfall och biflöden samt tillhörande analys- och sakkunnigtjänster.
          </p>

          <h3>Hur vet jag om materialet som jag innehar är avfall?</h3>

          <p>
            Avfall är material som uppkommer i vilken verksamhet som helst och som är obrukbart för
            producenten. Enligt avfallslagen (646/2011) är avfall ett ämne eller föremål som
            innehavaren har kasserat eller avser eller är skyldig att kassera. En exempelförteckning
            över avfall finns i bilaga 4 till förordningen om avfall (179/2012) ”Avfallsförteckning:
            Det vanligaste avfallet samt farligt avfall”.
          </p>
          <p>
            I regel svarar verksamhetsutövaren för klassificeringen av material som avfall. Avfall
            som uppkommer i verksamhet som kräver miljötillstånd antecknas i allmänhet i
            miljötillståndet. Vid behov kan man be om hjälp med att bedöma avfallskaraktären hos ett
            föremål eller ämne av en tillsynsmyndighet för avfallslagen (kommunens
            miljöskyddsmyndighet och närings-, trafik- och miljöcentralen).
          </p>
          <p>
            Det är viktigt att identifiera huruvida material som annonseras på Materialtorget är
            avfall. När material klassificeras som avfall, följer skyldigheter med stöd av
            avfallslagen. På Materialtorget ska mer uppgifter ges om avfall än om annat material. I
            avfallslagen fastställs även förutsättningarna för när klassificeringen som avfall
            slutar och för när ett ämne eller ett föremål inte är avfall utan en biprodukt.
          </p>

          <h3>Kan jag annonsera om material som uppkommer först i framtiden?</h3>

          <p>
            Du kan annonsera om befintliga och kommande materialpartier. Du ska dock precisera
            tidpunkten i annonsen, till exempel i avsnittet för fri beskrivning.
          </p>

          <h3>
            Hur säkerställer man att de avfallshanteringsföretag som tillhandahåller sina tjänster
            på Materialtorget har nödvändiga tillstånd för verksamheten?
          </h3>

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
            På Materialtorget är det möjligt att lägga till referensuppgifter samt kopior på
            tillstånd och registreringar i uppgifterna om organisationen. Då visas de i annonser och
            offerter, och det är lättare för den som överlämnar avfallet att ta reda på uppgifterna.
          </p>
          <p>
            Materialtorget svarar inte för riktigheten i referensuppgifter och bilagor som anges i
            tjänsten och de upphäver inte avfallsinnehavarens skyldighet att vid behov kontrollera
            uppgifterna.
          </p>

          <h3>Vad avser prioriteringsordningen i avfallslagen och vilka gäller den?</h3>

          <p>
            Bestämmelser om prioriteringsordningen finns i 8 § i avfallslagen (646/2011) och den
            gäller alla parter i avfallskedjan – den som producerar, samlar och behandlar avfallet.
          </p>
          <p>
            Enligt prioriteringsordningen ska i första hand mängden av och skadligheten hos det
            avfall som verksamheten ger upphov till minskas. Om avfall emellertid uppkommer, ska
            avfallsinnehavaren i första hand förbereda avfallet för återanvändning och i andra hand
            materialåtervinna det. Är materialåtervinning inte möjlig, ska avfallsinnehavaren
            återvinna avfallet på något annat sätt, exempelvis som energi. Om avfallet inte kan
            återvinnas ska det bortskaffas.
          </p>
          <p>
            När en avfallshanteringstjänst söks och offerter om tjänster bedöms på Materialtorget är
            det skäl att beakta skyldigheten enligt avfallslagen att iaktta prioriteringsordningen.
          </p>

          <h3>
            Kan jag göra en annons trots att jag inte ännu säkert känner till hurdant och hur mycket
            material som uppkommer under året?
          </h3>

          <p>
            I annonsen till Materialtorget anges vilket material man söker en mottagare av och
            materialets mängd uppskattas. Materialet och dess mängd kan dessutom beskrivas närmare.
            I annonsen kan man exempelvis uppskatta mängden material som uppkommer under året och
            det lönar sig att beskriva detta i fältet för fri tilläggsinformation. Det lönar sig att
            göra annonsen i det skede då man känner vilka material som uppkommer inom verksamheten
            och kan göra någon slags uppskattning av mängden material. Annars kan det vara svårt att
            hitta en lämplig mottagare.
          </p>

          <h3>Kan jag inkludera flera material i samma annons?</h3>

          <p>
            Utgångspunkten är att annons görs för ett enskilt material. På detta vis är det
            troligtvis lättast att hitta en mottagare för materialet. Det är även möjligt att göra
            en annons om vissa blandmaterial, så som blandat bygg- och rivningsmaterial. Dessutom
            kan man i vissa fall göra en annons om övrigt avfall eller biflöde (”övrigt avfall”,
            ”annat biflöde”) och beskriva materialets sammansättning i fältet för fri information.
            Exempelvis då man söker en helhetstjänst för en fastighet för flera typer av kommunalt
            avfall som samlas in separat kan man göra en annons om övrigt avfall och beskriv
            avfallet närmare i fältet för fri information eller i bilagan till annonsen.
          </p>

          <h3>Vem bär ansvar för att ”städa” Materialtorget, försvinner föråldrade annonser?</h3>

          <p>
            Annonsens upphovsman bär ansvar för att se till att uppgifterna i annonsen är aktuella.
            Då en annons görs fastställs en tidsfrist för annonsens giltighet. Då tidsfristen för
            annonsen löper ut avlägsnas annonsen automatiskt från vyn med annonser och arkiveras.
            Den maximala tidsfristen för en annons är sex månader.
          </p>
          <p>
            Annonsens tidsfrist kan vid behov förlängas genom att redigera annonsen och även efter
            att den stängts kan den publiceras på nytt om man så önskar.
          </p>
          <p>Annonsören kan även vid behov avlägsna annonsen innan tidsfristen löper ut.</p>

          <h2>Besvarande av annonser</h2>

          <h3>Kan jag kontakta annonsören via tjänsten? Eller utanför tjänsten?</h3>

          <p>
            Annonsören kan kontaktas via tjänsten eller utanför tjänsten med de kontaktuppgifter som
            annonsören uppgett.
          </p>

          <h3>Är de offerter som görs via tjänsten bindande?</h3>

          <p>
            Anbud om avfallshanteringstjänster är bindande. Om anbudet godkänns förbinder sig
            tjänsteleverantören sig till att erbjuda avfallshanteringstjänsten i enlighet med
            villkoren som uppgivits i samband med anbudet.
          </p>

          <h3>Kan jag ingå avtal och utföra transaktioner i anslutning till dem i tjänsten?</h3>

          <p>
            För närvarande är det inte möjligt att ingå avtal eller utföra transaktioner i
            anslutning till dem via tjänsten, med undantag för avtal om avfallshantering i andra
            hand mellan avfallsinnehavare och kommunala avfallsanläggningar.
          </p>

          <h2>Kommunal avfallshantering i andra hand (TSV)</h2>

          <h3>Vilka omfattas av skyldigheten att använda Materialtorget?</h3>

          <p>
            Skyldigheten att använda Materialtorget träder i kraft 1.1.2020 och den gäller
            avfallsinnehavare som behöver kommunal avfallshantering i andra hand för ett värde av
            minst 2 000 euro per år. Sådana offentliga aktörer som är upphandlande enheter avsedda i
            lagstiftning om offentlig upphandling omfattas av skyldigheten från och med 1.1.2021.
          </p>
          <p>
            Skyldigheten gäller inte kommunal avfallshantering i andra hand, där det årliga värdet
            är under 2 000 euro. I det fallet kan avfallsinnehavaren anvisa en begäran om tjänsten
            direkt till den kommunala avfallsanläggningen. Användning av Materialtorget förutsätts
            inte heller i oförutsedda och brådskande situationer, trots att värdet på den
            avfallshantering i andra hand som behövs skulle vara minst 2 000 euro.
          </p>

          <h3>
            När är det frågan om en sådan oförutsedd och brådskande situation, där avfallet kan
            transporteras till en kommunal avfallsanläggning utan att utnyttja Materialtorget?
          </h3>

          <p>
            Användning av Materialtorget förutsätts inte när kommunal avfallshantering i andra hand
            behövs omedelbart på grund av sådan oförutsebar brådska som avfallsinnehavaren inte
            rimligtvis har kunnat förutse. Ingen uttömmande definition av sådana brådskande
            situationer har getts. Det kan bli frågan om till exempel olika olycksfall, oförutsedda
            dröjsmål i tillgången till avfallshanteringstjänster eller andra situationer där
            avfallet omedelbart måste fås för behörig behandling, inklusive situationer där ett
            avfallsparti har skickats direkt till en kommunal avfallsanläggning på grund av en
            missbedömning av dess värde.
          </p>
          <p>
            Avfallsinnehavaren är skyldig att följa värdet på den kommunala avfallshantering i andra
            hand som behövs. Myndigheterna kan rikta övervakningsåtgärder mot avfallsinnehavaren i
            en situation där denne tydligt försummar sin skyldighet att använda Materialtorget.
          </p>
          <p>
            Kommunala avfallsanläggningar ger råd i innehållsmässiga frågor om avfallshantering i
            andra hand. I tekniska frågor gällande användningen av Materialtorget ger
            Materialtorgets administratör stöd vid behov.
          </p>

          <h3>Hur övervakas avfallsinnehavarens verksamhet och användning av Materialtorget?</h3>

          <p>
            Avfallsinnehavarens bedömning om bristande utbud av tjänster räcker till för att påvisa
            behovet av avfallshantering i andra hand. En kommunal avfallsanläggning bedömer inte
            sakens innehåll efter att ha fått en tjänstebegäran.
          </p>
          <p>
            Även när det gäller kommunal avfallshantering i andra hand som faller utanför
            skyldigheten att använda Materialtorget är utgångspunkten en begäran och en bedömning av
            bristande tjänsteutbud som avfallsinnehavaren gör. Avfallsinnehavaren ansvarar för att
            följa upp det årliga värdet på kommunal avfallshantering i andra hand som innehavaren
            behöver och vid behov använda Materialtorget.
          </p>
          <p>
            Vid misstanke om missbruk kan myndigheterna vid behov rikta övervakningsåtgärder mot
            avfallsinnehavaren. Till Materialtorget samlas information om kommunal avfallshantering
            i andra hand, vilket ökar transparensen i verksamheten och möjliggör smidigare
            uppföljning och övervakning.
          </p>

          <h3>På vilka grunder kan en offert avslås?</h3>

          <p>
            En offert kan avslås om den är oskälig när det gäller antingen den erbjudna tjänstens
            pris eller kvalitet. Tjänstens oskäliga kvalitet kan påvisas av till exempel den
            erbjudna tjänstens tidpunkt, långa transportsträckor inklusive förflyttning av avfallet
            till ett annat land, försummelse av offertgivarens lagstadgade skyldigheter eller av att
            offerten inte stämmer överens med prioriteringsordningen i 8 § i avfallslagen. Även en
            offert som påminner om avfallsförmedling och som uteslutande grundar sig på utnyttjande
            av kommunal avfallshantering i andra hand kan också vara oskälig. Däremot är en offert
            om en övergripande avfallshantering i allmänhet inte oskälig, även om den till vissa
            delar skulle basera sig på kommunal avfallshantering i andra hand.
          </p>
          <p>
            Även priset som begärs för tjänsten kan vara ett bevis på oskälighet. En liten avvikelse
            från priset på kommunal avfallshantering i andra hand medför dock inte att offerten är
            oskälig.
          </p>

          <h3>
            Framförs begäran om kommunal avfallshantering i andra hand alltid till den närmaste
            avfallsanläggningen?
          </h3>

          <p>
            Begäran ska i första hand riktas till den närmaste avfallsanläggningen. Om avsikten är
            att rikta begäran till en avfallsanläggning som är belägen längre bort, bör
            avfallsinnehavaren beakta detta även vid bedömningen av skäligheten i de mottagna
            offerterna.
          </p>
          <p>
            En kommunal avfallsanläggning har rätt att vägra ordna avfallshantering, om avfallet på
            grund av mängd eller beskaffenhet är tekniskt olämpligt för att transporteras eller
            behandlas i det kommunala avfallshanteringssystemet.
          </p>

          <h3>Vad ska den kommunala avfallsanläggningen göra på Materialtorget?</h3>
          <p>
            I och med ändringen i avfallslagen som trädde i kraft 1.1.2020 är kommunens, dvs. i de
            flesta fall den kommunala avfallsanläggningens, uppgifter på Materialtorget:
          </p>
          <p>1. Ta emot och behandla begäranden om kommunal avfallshantering i andra hand.</p>
          <p>
            2. Ingå avtal om kommunal avfallshantering i andra hand direkt på Materialtorget eller
            föra in vissa uppgifter om avtal som ingåtts utanför Materialtorget inom 14 dygn från
            att avtalet ingåtts.
          </p>
          <p>
            3. Föra in sammanställda uppgifter på Materialtorget om övriga kommunal avfallshantering
            i andra hand varje år innan slutet av mars. Denna övriga avfallshantering är hantering
            som inte ingår i användningsskyldigheten för Materialtorget, dvs. underskrider
            gränsvärdet på 2 000 euro, beror på icke förutsägbar brådska eller är kommunal
            avfallshantering i andra hand under en övergångsperiod som inte omfattas av
            användningsskyldigheten. Uppgifterna som ska föras in är mängden avfall per avfallstyp
            och specificerade hanteringsmetoder.
          </p>

          <h3>
            Vilka skyldigheter och ansvar innebär ändringen av avfallslagen i praktiken för
            avfallshanteringsmyndigheten?
          </h3>
          <p>
            Ändringen i avfallslagen innebär att kommunens avfallshanteringsmyndighet,
            tillsynsmyndigheter i enlighet med 24 § i avfallslagen och Konkurrens- och
            konsumentverket har rätt att få information från Materialtorget om kommunens
            avfallshantering i andra hand som är nödvändig för utförandet av deras lagstadgade
            uppgifter. Av ändringen följer ingen ny uppföljnings- eller tillsynsskyldighet, den
            underlättar närmast tillgången till nödvändiga uppgifter för uppföljning och tillsyn
            jämfört med tidigare. Avfallshanteringsmyndigheten kan annonsera upptäckta
            missförhållanden till tillsynsmyndigheten, som inom ramen för sina befogenheter kan
            ingripa i missförhållanden i enlighet med normala förfaranden enligt avfallslagen.
            Tillsynsmyndighetens åtgärder ska riktas in på aktörer som försummar sin skyldighet att
            lämna in en anbudsbegäran till Materialtorget, ingår ett avtal om kommunal
            avfallshantering i andra hand utan att använda Materialtorget på det sätt som förutsätts
            eller underlåter att lämna in nödvändiga uppgifter om kommunal avfallshantering i andra
            hand till Materialtorget.
          </p>

          <h3>
            Ska gamla giltiga avtal om avfallshantering i andra hand lämnas in till Materialtorget?
          </h3>
          <p>
            Avtal om kommunal avfallshantering i andra hand som ingåtts innan 2020 är giltiga fram
            till slutet av avtalsperioden (max. 3 år) och skyldigheterna i enlighet med ändringen av
            avfallslagen som trädde i kraft i början av 2020 gäller inte som sådana avfallshantering
            som genomförs enligt dessa avtal. Det rekommenderas att uppgifter om avfallshantering i
            andra hand som genomförs utgående från avtal av detta slag lämnas in till Materialtorget
            för att det grundläggande syftet för lagändringen, dvs. ökad transparens, ska uppfyllas
            i så hög grad som möjligt. Uppgifterna kan lämnas in i sammanställd form på samma sätt
            som information om övriga avfallshantering i andra hand som inte omfattas av
            skyldigheten att använda Materialtorget. De sammanställda uppgifterna som ska föras in
            är mängden avfall per avfallstyp och specificerade hanteringsmetoder.
          </p>

          <h3>
            Är det möjligt att få begäranden om kommunal avfallshantering i andra hand per e-post?
          </h3>
          <p>
            Begäran om kommunal avfallshantering i andra hand förmedlas från kunden till
            avfallsanläggningen via Materialtorget. Ett meddelande om inkommen begäran skickas per
            e-post till avfallsanläggningen till den e-postadress som anläggningen uppgett i sina
            egna uppgifter.
          </p>

          <h3>
            Hur följer man upp att gränsen för skyldigheten att använda Materialtorget (2 000 €)
            iakttas?
          </h3>
          <p>
            En anbudsbegäran, dvs. annons, i enlighet med avfallslagen ska lämnas in till
            Materialtorget om värdet på den nödvändiga kommunala avfallshanteringen i andra hand
            överskrider 2 000 euro per år. Gränsvärdet gäller enskilda företag och dess uppföljning
            ligger i första hand på avfallsinnehavarens ansvar. Det lönar sig för avfallsinnehavaren
            att förutsäga sitt behov av tjänsten och göra en annons till Materialtorget i tid.
          </p>
          <p>
            Ingen uppföljningsskyldighet har fastställts för avfallsanläggningarnas del, men i
            praktiken kan avfallsanläggningarna ha ett behov av att följa upp att gränsen inte
            överskrids eftersom ett avtal om avfallshantering i andra hand för den överskridande
            delen i enlighet med avfallslagen endast bör göras då Materialtorget använts på
            tillbörligt sätt. Undantag från detta är oförutsägbara brådskande situationer.
          </p>

          <h3>
            Är gränsen för användningsskyldigheten för Materialtorget (2 000 €)
            mervärdesskattebelagd eller skattefri?
          </h3>
          <p>
            Detta fastställs inte i avfallslagen. En modell för kalkylering av värdet på kommunal
            avfallshantering i andra hand skulle kunna fås av gränsvärdena inom offentlig
            upphandling, som inte är belagda med mervärdesskatt.
          </p>

          <h3>
            Vad ska man göra om avfallet inte motsvarar det som man kommit överens om i avtalet om
            avfallshantering i andra hand då det lämnas in till avfallsanläggningen?
          </h3>
          <p>
            Anbudsbegärans upphovsman definierar avfallet och väsentliga uppgifter om avfallet då en
            anbudsbegäran görs på Materialtorget. Om avfallet eller de övriga uppgifterna inte
            motsvarar det som man uppgett har bristen på övrigt serviceutbud som är en förutsättning
            för avfallshantering i andra hand konstaterats på felaktig grund. Detta innebär att man
            ska göra en ny anbudsbegäran med korrigerade uppgifter och se om det finns en lämplig
            marknadsbestämd tjänst. Om avfallet dock redan lämnats in till avfallsanläggningen ska
            avfallsanläggningen avgöra om det finns anledning att ta emot avfallet trots att det
            inte motsvarar avtalet. Det lönar sig dock att påminna den som begär avfallshantering om
            att göra en ny korrigerad anbudsbegäran på Materialtorget, om behovet av
            avfallshantering fortsätter. Det lönar sig för avfallsanläggningarna att förutsäga
            situationer av detta slag även i avtalsvillkoren i anslutning till avfallshanteringen i
            andra hand.
          </p>

          <h3>
            Om avtalet för avfallshantering i andra hand ingås för ”övrigt avfall” i enlighet med
            uppskattningen av avfallsmängden och avfallet vid avfallsstationen sorteras i flera
            kategorier, ska de olika kategorierna rapporteras till Materialtorget?
          </h3>
          <p>
            Utgångspunkten är att avfallet definieras så exakt och beskrivande som möjligt i
            anbudsbegäran. Om lämplig avfallstyp saknas i menyn kan man välja ”övrigt avfall” och
            beskriva avfallet i fältet för fri information. Om ett avtal om kommunal
            avfallshantering i andra hand har ingåtts och dess uppgifter finns på Materialtorget
            behöver man inte rapportera om avtalets förverkligande till Materialtorget.
          </p>

          <h3>
            Ska enskilda anbudsbegäranden lämnas in och avtal om avfallshantering i andra hand ingås
            för samtliga avfallstyper eller kan alla avfallstyper inkluderas i en och samma
            anbudsbegäran?
          </h3>
          <p>
            Utgångspunkten är att en anbudsbegäran, dvs. annons, lämnas in per avfallstyp. På detta
            vis är det troligtvis lättast att hitta en mottagare för avfallet. Det är även möjligt
            att göra en annons om vissa blandavfall, så som blandat bygg- och rivningsavfall.
            Dessutom kan man i vissa fall göra en annons om övrigt avfall (”övrigt avfall”).
            Exempelvis då man söker en helhetstjänst för en fastighet för flera typer av kommunalt
            avfall som samlas in separat kan man göra en annons om övrigt avfall och beskriv
            avfallet närmare i fältet för fri information eller i bilagan till annonsen. Avtal om
            kommunal avfallshantering i andra hand på Materialtorget ingås utgående från annonsen,
            varvid avtalet gäller det avfall som fastställs i annonsen.
          </p>

          <h3>
            Ska företaget uppge avfallspartiet på Materialtorget, om de har ett giltigt avtal om
            avfallshantering i andra hand som ingåtts vid en tidigare tidpunkt?
          </h3>
          <p>
            Avtal om avfallshantering i andra hand som ingåtts innan 2020 är giltiga fram till
            slutet av avtalsperioden (max. 3 år). I detta fall behöver man inte göra en
            anbudsbegäran om avfallet i fråga, utan under avtalsperioden kan avfallet lämnas in till
            den kommunala avfallsanläggningen på det sätt som man kommit överens om.
          </p>

          <h3>
            Vad ska jag göra om den kommunala avfallsanläggningen inte tillhandahåller den
            avfallshantering i andra hand som jag har behov av?
          </h3>
          <p>
            På Materialtorget riktas begäran om kommunal avfallshantering i andra hand i första hand
            till avfallsanläggningen i den närmaste kommunen. Om avfallsanläggningen förkastar
            begäran, returneras begäran till avsändaren på Materialtorget varvid den kan skickas
            till en annan avfallsanläggning. Avfallsanläggningen motiverar varför man förkastar
            begäran, alltså varför man inte kan erbjuda den begärda tjänsten och kan samtidigt om
            man önskar ge råd om vart begäran bör riktas istället. Begäran kan endast skickas till
            en avfallsanläggning åt gången.
          </p>

          <h3>
            Kan en kommunal avfallsanläggning annonsera om sin avfallshantering i andra hand på
            Materialtorget?
          </h3>
          <p>
            Det är inte ändamålsenligt att annonsera om kommunal avfallshantering i andra hand på
            Materialtorget. I allmänhet finns det inte anledning att marknadsföra lagstadgade
            tjänster, såsom avfallshantering i andra hand, på samma sätt som marknadsbestämda
            tjänster. Annonser om avfallshantering i andra hand på Materialtorget kunde komma att
            blandas ihop med marknadsbestämda tjänster. På Materialtorget kan kommunala
            avfallsanläggningar dock informera om den avfallshantering i andra hand som de erbjuder
            i det skede då man mottar en begäran om avfallshantering i andra hand. Uppgifter om
            avfallshanteringen i andra hand kan läggas till i avfallsanläggningens egna uppgifter.
          </p>

          <h3>
            Hur kan avfallsinnehavaren bedöma rimligheten hos mottagna anbud om man inte på förhand
            känner till avfallsanläggningens priser för avfallshantering i andra hand?
          </h3>
          <p>
            Bedömningen av rimligheten hos mottagna anbud påverkas troligtvis av flera olika saker,
            varav en kan vara priserna för de erbjudna tjänsterna jämfört med de kommunala
            avfallsanläggningarnas priser. Kommunernas avfallspriser är offentlig information och
            vanligtvis finns en prislista exempelvis på avfallsanläggningarnas webbplats. För
            närmare information om priser kan man kontakta avfallsanläggningen. Att det
            marknadsbestämda priset skiljer sig lite från priset för kommunal avfallshantering i
            andra hand är dock inte tillräcklig motivering för avfallshantering i andra hand.
          </p>

          <h3>
            Hur kan man försäkra sig om att ett företag som gjort en anbudsbegäran om
            avfallshantering i andra hand har rätt att ingå ett avtal i ett annat bolags namn?
          </h3>
          <p>
            På Materialtorget kan anbudsbegäran och begäran om avfallshantering i andra hand göras
            och avtal om avfallshantering i andra hand ingås utöver av avfallets innehavare av
            avfallets transportör eller en annan aktör som erbjuder avfallets innehavare exempelvis
            en helhetstjänst (transport och behandling). Man behöver inte specificera varifrån
            avfallet ursprungligen kommer i anbudsbegäran, begäran om avfallshantering i andra hand
            eller i avtalet om avfallshantering i andra hand. Enligt avfallslagen förutsätts inte
            heller en fullmakt om parten är någon annan än avfallsinnehavaren. Avfallsinnehavaren
            kan dock kräva exempelvis uppgifter om vart avfallet levereras av tjänsteleverantören.
          </p>
          <p>
            Om begäran om avfallshantering i andra hand görs av avfallets transportör eller en annan
            aktör kan begäran gälla enbart hantering av avfallet.
          </p>

          <p>
            <strong>
              Hittade du inte ett svar på din fråga? Kontakta{' '}
              <a href="mailto:materiaalitori@motiva.fi">materiaalitori@motiva.fi</a>.
            </strong>
          </p>
        </>
      );

    default: {
      return (
        <>
          <h1>{title}</h1>

          <h2>Palvelu</h2>

          <h3>Miten Materiaalitoriin kirjaudutaan?</h3>

          <p>
            Materiaalitoriin kirjaudutaan valitsemalla palvelun pääsivun oikeasta ylänurkasta
            Kirjaudu/Rekisteröidy, joka johtaa kirjautumissivulle. Voit kirjautua henkilökohtaisella
            käyttäjätunnuksella ja salasanalla, jotka määritetään palveluun rekisteröitymisen
            yhteydessä. Rekisteröityminen tapahtuu samalla sivulla. Rekisteröityminen tapahtuu
            suomi.fi palvelun kautta ja rekisteröitymiseen tarvitset edustamasi organisaation
            y-tunnuksen.
          </p>

          <h3>Miksi palveluun pitää tunnistautua vahvasti?</h3>

          <p>
            Vahvalla tunnistautumisella suomi.fi palvelun kautta varmistetaan käyttäjän oikea
            henkilöllisyys väärinkäytösten estämiseksi.
          </p>

          <h3>Minulla ei ole y-tunnusta. Voinko käyttää palvelua?</h3>

          <p>Palvelu on tarkoitettu ainoastaan yrityksille ja yhteisöille, joilla on y-tunnus.</p>

          <h3>Olen unohtanut käyttäjätunnuksen ja salasanan. Mitä teen?</h3>

          <p>Sähköpostiosoitteesi on käyttäjätunnuksesi.</p>
          <p>
            Saat päivitettyä uuden salasanan unohtuneen tilalle valitsemalla "Unohditko salasanasi?"
            -palvelun kirjautumissivulta. Salasanan päivityslinkki lähetetään sähköpostiisi.
          </p>

          <h3>Onko palvelussa maksuja?</h3>

          <p>Materiaalitorin käyttö on maksutonta.</p>

          <h3>Onko palveluun avointa rajapintaa?</h3>

          <p>Palveluun ollaan luomassa rajapintaa. Rajapintakuvaus tulee aikanaan saataville.</p>

          <h3>Keitä ovat aluekoordinaattorit?</h3>

          <p>
            Aluekoordinaattorit ovat Teolliset symbioosit toimintamallin eri alueilla toimivia
            henkilöitä ja organisaatioita, joiden tehtävänä on edistää sivuvirtojen hyödyntämistä
            yritysten toiminnassa. Lisätietoja toiminnasta ja aluekoordinaattoreiden yhteystiedot
            löytyvät <a href="http://teollisetsymbioosit.fi">www.teollisetsymbioosit.fi</a>{' '}
            -sivuilta. Aluekoordinaattoreiden on mahdollista tehdä ilmoituksia organisaatioiden
            puolesta, mikäli näin on sovittu.
          </p>

          <h2>Ilmoitukset</h2>

          <h3>Mistä materiaaleista ja palveluista voin ilmoittaa?</h3>

          <p>
            Palvelussa voi ilmoittaa kaikenlaisia toiminnassasi syntyviä jätteitä tai sivuvirtoja.
            Myös jätteistä tai sivuvirroista tuotteistettuja materiaaleja voi tarjota palvelun
            kautta.
          </p>
          <p>
            Palveluilmoituksissa voit ilmoittaa jätteiden ja sivuvirtojen kuljetukseen, käsittelyyn
            ja varastointiin liittyviä palveluja sekä niihin liittyviä analyysi- ja
            asiantuntijapalveluita.
          </p>

          <h3>Mistä tietää onko hallussa oleva materiaali jätettä?</h3>

          <p>
            Jäte on mistä tahansa toiminnasta syntyvää sen tuottajalle käyttökelvotonta materiaalia.
            Jätelain (646/2011) mukaan jätettä on aine tai esine, jonka haltija on poistanut tai
            aikoo poistaa käytöstä taikka on velvollinen poistamaan käytöstä. Esimerkkiluettelo
            jätteistä löytyy jäteasetuksen (179/2012) liitteestä 4 "Jäteluettelo: Yleisimmät jätteet
            sekä vaaralliset jätteet".
          </p>
          <p>
            Lähtökohtaisesti toiminnanharjoittaja vastaa materiaalin luokittelusta jätteeksi.
            Ympäristöluvanvaraisessa toiminnassa syntyvät jätteet kirjataan yleensä ympäristölupaan.
            Apua esineen ja aineen jäteluonteen arvioinnissa voi tarvittaessa pyytää
            toiminnanharjoittajan sijaintipaikan jätelain valvontaviranomaiselta (kunnan
            ympäristönsuojeluviranomainen ja elinkeino-, liikenne- ja ympäristökeskus).
          </p>
          <p>
            On tärkeää tunnistaa, ovatko Materiaalitorissa ilmoitetut materiaalit jätettä.
            Materiaalin luokittelusta jätteeksi seuraa jätelaista tulevia velvoitteita.
            Materiaalitorissa jätteestä tulee antaa enemmän tietoja kuin muusta materiaalista.
            Jätelaissa määritellään myös edellytykset jätteeksi luokittelun päättymiselle ja sille,
            milloin aine tai esine ei ole jäte vaan sivutuote.
          </p>

          <h3>Voinko ilmoittaa materiaaleista, jotka syntyvät vasta tulevaisuudessa?</h3>

          <p>
            Voit ilmoittaa olemassa olevista ja tulevista materiaalieristä. Tarkenna ajankohta
            kuitenkin ilmoituksessa esimerkiksi vapaamuotoisessa kuvaus-kohdassa.
          </p>

          <h3>
            Miten varmistetaan, että Materiaalitorissa palvelujaan tarjoavilla jätehuoltoyrityksillä
            on toimintaansa tarvittavat luvat?
          </h3>

          <p>
            Jätelain (646/2011) 29 §:n mukaan jätteen saa luovuttaa pääsääntöisesti toimijalle, joka
            on merkitty jätehuoltorekisteriin tai jolla on ympäristöluvan tai ympäristönsuojelun
            tietojärjestelmän rekisteröinnin perusteella oikeus ottaa vastaan kyseistä jätettä.
            Jätteenhaltijan on siis tarvittaessa varmistettava viimeistään jätettä luovuttaessaan,
            että jätteen kuljettaja on merkitty jätehuoltorekisteriin ja jätteen käsittelijällä on
            oikeus vastaanottaa kyseistä jätettä.
          </p>
          <p>
            Materiaalitorissa on mahdollisuus lisätä organisaation tietoihin viitetiedot sekä kopiot
            luvista ja rekisteröinneistä. Tällöin ne näkyvät tehdyissä ilmoituksissa ja
            tarjouksissa, jolloin jätteen luovuttajan on helpompi selvittää tiedot.
          </p>
          <p>
            Materiaalitori ei vastaa palveluun ilmoitettujen viitetietojen ja liitteiden
            oikeellisuudesta eivätkä ne poista jätteen haltijan velvollisuutta tarkistaa tiedot
            tarvittaessa.
          </p>

          <h3>Mitä tarkoittaa jätelain etusijajärjestys ja ketä se koskee?</h3>

          <p>
            Etusijajärjestyksestä säädetään jätelain (646/2011) 8 §:ssä ja se koskee kaikkea
            toimintaa ja kaikkia osapuolia jäteketjussa - jätteen tuottajaa, kerääjää ja
            käsittelijää.
          </p>
          <p>
            Etusijajärjestyksen mukaan ensisijaisesti on vähennettävä syntyvän jätteen määrää ja
            haitallisuutta. Jos jätettä kuitenkin syntyy, jätteen haltijan on ensisijaisesti
            valmisteltava jäte uudelleenkäyttöä varten tai toissijaisesti kierrätettävä se. Jos
            kierrätys ei ole mahdollista, jätteen haltijan on hyödynnettävä jäte muulla tavoin,
            mukaan lukien hyödyntäminen energiana. Jos hyödyntäminen ei ole mahdollista, jäte on
            loppukäsiteltävä.
          </p>
          <p>
            Materiaalitorissa jätehuoltopalvelua haettaessa ja palvelutarjouksia arvioitaessa on
            syytä huomioida jätelain mukainen velvollisuus noudattaa etusijajärjestystä.
          </p>

          <h3>
            Voiko ilmoituksen tehdä, vaikka ei tiedä vielä varmaksi mitä ja miten paljon
            materiaaleja vuoden aikana syntyy?
          </h3>
          <p>
            Materiaalitoriin tehtävässä ilmoituksessa määritetään mille materiaalille vastaanottajaa
            haetaan ja arvioidaan materiaalin määrä. Materiaalia ja sen määrää voi lisäksi kuvata
            tarkemmin. Ilmoitukseen voi esimerkiksi arvioida syntyvän materiaalin määrän vuodessa ja
            se kannattaa kuvata vapaaseen lisätietokenttään. Ilmoitus kannattaa tehdä siinä
            vaiheessa, kun tiedetään, mitä materiaaleja toiminnassa syntyy ja pystytään tekemään
            jonkinlainen arvio niiden määrästä. Muutoin sopivaa vastaanottajaa voi olla vaikea
            löytää.
          </p>

          <h3>Voinko laittaa samaan ilmoitukseen useita materiaaleja?</h3>

          <p>
            Lähtökohtaisesti yhdestä materiaalista tehdään yksi ilmoitus. Tällöin materiaalille on
            todennäköisesti helpointa löytää vastaanottaja. Joistakin sekalaisista materiaaleista,
            kuten sekalaisesta rakennus- ja purkujätteestä, on myös mahdollista tehdä ilmoitus.
            Lisäksi joissakin tapauksissa voi tehdä ilmoituksen muusta jätteestä tai sivuvirrasta
            (”muu jäte”, ”muu sivuvirta”) ja kuvata materiaalin koostumusta vapaaseen kenttään.
            Esimerkiksi haettaessa kiinteistön kokonaispalvelua useille erikseen kerätyille
            yhdyskuntajätteille, ilmoituksen voi tehdä muusta jätteestä ja kuvata jätteet tarkemmin
            vapaassa kentässä tai ilmoituksen liitteessä.
          </p>

          <h3>Kenen vastuulla on Materiaalitorin ”siivoaminen” eli häviääkö vanhat ilmoitukset?</h3>
          <p>
            Ilmoituksen tekijän vastuulla on huolehtia siitä, että ilmoituksen tiedot ovat ajan
            tasalla. Ilmoitusta tehdessä siihen määritetään määräaika, jonka ilmoitus on voimassa.
            Kun ilmoituksen määräaika umpeutuu, ilmoitus poistuu ilmoitukset -näkymästä
            automaattisesti ja siirtyy arkistoon. Ilmoituksen määräaika on pisimmillään puoli
            vuotta.
          </p>
          <p>
            Ilmoituksen määräaikaa voi tarvittaessa jatkaa muokkaamalla ilmoitusta ja sulkeutumisen
            jälkeenkin sen voi halutessaan julkaista uudelleen.
          </p>
          <p>
            Ilmoittaja voi tarvittaessa myös poistaa ilmoituksen näkyvistä ennen voimassaolon
            umpeutumista.
          </p>

          <h2>Ilmoituksiin vastaaminen</h2>

          <h3>Voinko ottaa yhteyttää ilmoittajaan palvelussa? Entä palvelun ulkopuolella?</h3>

          <p>
            Ilmoittajaan voi ottaa yhteyttä palvelun kautta tai palvelun ulkopuolella ilmoittajan
            antamilla yhteystiedoilla.
          </p>

          <h3>Ovatko palvelun kautta tehdyt tarjoukset sitovia?</h3>

          <p>
            Jätehuoltopalveluista tehtävät tarjoukset ovat sitovia. Mikäli tarjous hyväksytään,
            tarjoaja sitoutuu tarjoamaan jätehuoltopalvelun tarjouksensa yhteydessä ilmoittamiensa
            ehtojen mukaisesti.
          </p>

          <h3>Voinko tehdä sopimuksia ja niihin liittyviä transaktioita palvelussa?</h3>

          <p>
            Sopimusten ja niihin liittyvien transaktioiden tekeminen palvelun kautta ei ole tällä
            hetkellä mahdollista lukuunottamatta jätteen haltijoiden ja kunnallisten jätelaitosten
            TSV-sopimuksia.
          </p>

          <h2>Kunnan toissijainen jätehuoltopalvelu (TSV)</h2>

          <h3>Ketä velvollisuus Materiaalitorin käyttämiseen koskee?</h3>

          <p>
            Velvollisuus Materiaalitorin käyttöön tulee voimaan 1.1.2020 ja koskee jätteen
            haltijoita, jotka tarvitsevat kunnan toissijaista jätehuoltopalvelua vuodessa vähintään
            2000 euron arvosta. Sellaisia julkisia toimijoita, jotka ovat julkisia hankintoja
            koskevassa lainsäädännössä tarkoitettuja hankintayksiköitä velvollisuus koskee 1.1.2021
            alkaen.
          </p>
          <p>
            Velvollisuus ei koske kunnan toissijaista jätehuoltopalvelua, jonka vuosittainen arvo on
            alle 2 000 euroa. Jätteen haltija voi tällöin osoittaa palvelua koskevan pyynnön suoraan
            kunnan jätelaitokselle. Materiaalitorin käyttöä ei edellytetä myöskään ennakoimattomissa
            kiiretilanteissa, vaikka tarvittavan toissijaisen jätehuoltopalvelun arvo sinänsä olisi
            vähintään 2 000 euroa.
          </p>

          <h3>
            Milloin kyse on sellaisesta ennakoimattomasta kiiretilanteesta, jossa jäte voidaan
            toimittaa kunnan jätelaitokselle Materiaalitoria käyttämättä?
          </h3>

          <p>
            Materiaalitorin käyttöä ei edellytetä silloin, kun kunnan toissijaista
            jätehuoltopalvelua tarvitaan välittömästi sellaisen ennalta arvaamattoman kiireen
            vuoksi, jota jätteen haltija ei ole voinut kohtuudella ennakoida. Tällaisia
            kiiretilanteita ei ole määritelty tyhjentävästi. Kyseeseen voivat tulla esimerkiksi
            erilaiset onnettomuustilanteet, jätehuoltopalveluiden saatavuudessa ilmenevät ennalta
            arvaamattomat viiveet tai muut tilanteet, joissa jäte on saatava välittömästi
            asianmukaiseen käsittelyyn, mukaan lukien tilanteet, joissa jäte-erä on sen arvoa
            koskevan virhearvion vuoksi toimitettu suoraan kunnan jätelaitokselle.
          </p>
          <p>
            Jätteen haltija on velvollinen seuraamaan tarvitsemansa kunnan toissijaisen
            jätehuoltopalvelunvuosittaista arvoa. Viranomaiset voivat kohdistaa jätteen haltijaan
            valvontatoimenpiteitä tilanteessa, jossa tämä selvästi laiminlyö velvollisuutensa
            käyttää Materiaalitoria.
          </p>
          <p>
            Kuntien jätelaitokset antavat neuvontaa kunnan toissijaiseen jätehuoltopalveluun
            liittyvissä sisällöllisissä kysymyksissä. Materiaalitorin käyttöön liittyvissä
            teknisissä kysymyksissä tukea saa tarvittaessa Materiaalitorin ylläpidolta.
          </p>

          <h3>Miten jätteen haltijan toimintaa ja Materiaalitorin käyttöä valvotaan?</h3>

          <p>
            Jätteen haltijan Materiaalitorissa tekemä arvio palvelutarjonnan puutteesta riittää
            kunnan toissijaisen jätehuoltopalvelun tarpeen osoittamiseksi. Kunnan jätelaitos ei
            palvelupyynnön saatuaan arvioi asiaa sisällöllisesti.
          </p>
          <p>
            Myös Materiaalitorin käyttövelvoitteen ulkopuolelle jäävän kunnan toissijaisen
            jätehuoltopalvelun osalta lähtökohtana on jätteen haltijan tekemä pyyntö ja arvio muun
            palvelutarjonnan puutteesta. Jätteen haltijan vastuulla on seurata tarvitsemansa kunnan
            toissijaisen jätehuoltopalvelun vuotuista arvoa ja käyttää tarvittaessa Materiaalitoria.
          </p>
          <p>
            Viranomaiset voivat tarvittaessa kohdistaa jätteen haltijaan valvontatoimenpiteitä, jos
            väärinkäytöksiä epäillään. Materiaalitoriin kertyy tietoa kunnan toissijaisesta
            jätehuoltopalvelusta, mikä lisää toiminnan läpinäkyvyyttä ja mahdollistaa entistä
            sujuvamman seurannan ja valvonnan.
          </p>

          <h3>Millä perusteella tarjous voidaan hylätä?</h3>

          <p>
            Tarjous voidaan hylätä, jos se on joko tarjotun palvelun hinnan tai laadun suhteen
            kohtuuton. Palvelun laadun kohtuuttomuutta voi osoittaa esimerkiksi tarjotun palvelun
            ajankohta, pitkät kuljetusmatkat jätteen siirto toiseen maahan mukaan lukien, tarjoajan
            lakisääteisten velvoitteiden laiminlyönti taikka se, ettei tarjous ole jätelain 8 §:n
            etusijajärjestyksen mukainen. Kohtuuton voi olla myös jätteen välitystoimintaa
            muistuttava tarjous, joka perustuu yksinomaan kunnan toissijaisen jätehuoltopalvelun
            hyödyntämiseen. Kohtuuton ei sitä vastoin yleensä ole tarjous jätehuollon
            kokonaispalvelusta, vaikka se joiltain osin perustuisi kunnan toissijaiseen
            jätehuoltopalveluun.
          </p>
          <p>
            Kohtuuttomuutta voi osoittaa myös palvelusta pyydetty hinta. Pieni poikkeama kunnan
            toissijaisen jätehuoltopalvelun hinnasta ei kuitenkaan vielä aiheuta kohtuuttomuutta.
          </p>

          <h3>
            Tehdäänkö pyyntö kunnan toissijaisesta jätehuoltopalvelusta aina lähimmälle
            jätelaitokselle?
          </h3>

          <p>
            Pyyntö tulee ensisijaisesti kohdistaa lähimmälle jätelaitokselle. Jos pyyntö on
            tarkoitus osoittaa kauempana sijaitsevalle jätelaitokselle, jätteen haltijan tulisi
            huomioida tämä myös arvioidessaan saamiensa tarjousten kohtuullisuutta.
          </p>
          <p>
            Kunnan jätelaitoksella on oikeus kieltäytyä jätehuollon järjestämisestä, jos jäte
            määränsä tai laatunsa takia on teknisesti sopimatonta kunnan jätehuoltojärjestelmässä
            kuljetettavaksi tai käsiteltäväksi.
          </p>

          <h3>Mitä kunnan jätelaitoksen tulee tehdä Materiaalitorissa?</h3>
          <p>
            1.1.2020 voimaan tulevan jätelain muutoksen myötä kunnan eli useimmissa tapauksessa
            kunnan jätelaitoksen tehtävänä on Materiaalitorissa:
          </p>
          <p>
            1. Vastaanottaa ja käsitellä kunnan toissijaista jätehuoltopalvelua koskevat pyynnöt.
          </p>
          <p>
            2. Tehdä sopimukset kunnan toissijaisesta jätehuoltopalvelusta suoraan Materiaalitorissa
            tai tuoda tietyt tiedot Materiaalitoriin ulkopuolella tehdyistä sopimuksista 14 vrk:n
            kuluessa sopimuksen tekemisestä.
          </p>
          <p>
            3. Tuoda koontitiedot Materiaalitoriin muusta kunnan toissijaisesta jätehuoltopalvelusta
            vuosittain maaliskuun loppuun mennessä. Tätä muuta palvelua on Materiaalitorin
            käyttövelvoitteen ulkopuolelle jäävä palvelu eli 2000 euron kynnysarvon alle jäävä,
            ennalta-arvaamattomasta kiireestä johtuva tai siirtymäaikana käyttövelvoitteen
            ulkopuolelle jäävä kunnan toissijainen jätehuoltopalvelu. Tuotavia tietoja ovat jätteen
            määrät jätelajeittain ja käsittelymenetelmittäin eriteltyinä.
          </p>

          <h3>
            Mitä velvoitteita ja vastuita jätehuoltoviranomaiselle jätelain muutos tuo käytännössä?
          </h3>
          <p>
            Jätelain muutos tuo kunnan jätehuoltoviranomaiselle, jätelain 24 §:ssä tarkoitetuille
            valvontaviranomaisille ja Kilpailu- ja kuluttajavirastolle oikeuden saada
            Materiaalitorista tietoja kunnan toissijaisesta jätehuoltopalvelusta, jotka ovat
            välttämättömiä niille laissa säädettyjen tehtävien hoitamiseksi. Muutoksesta ei seuraa
            uutta seuranta- tai valvontavelvoitetta, se lähinnä helpottaa seurantaan ja valvontaan
            tarvittavien tietojen saantia aiempaan verrattuna. Jätehuoltoviranomainen voi ilmoittaa
            valvontaviranomaiselle havaitsemistaan epäkohdista, joka taas voi toimivaltuuksiensa
            puitteissa puuttua epäkohtiin jätelain normaalien menettelyiden mukaisesti.
            Valvontaviranomaisen toimet tulisi kohdistaa toimijoihin, jotka laiminlyövät
            velvollisuutensa tehdä tarjouspyynnön Materiaalitoriin, tekevät kunnan toissijaisesta
            jätehuoltopalvelusta sopimuksen, vaikkei Materiaalitoria ole edellytetyllä tavalla
            käytetty tai jättävät toimittamatta Materiaalitoriin tarvittavat kunnan toissijaista
            palvelua koskevat tiedot.
          </p>

          <h3>Pitääkö vanhat voimassa olevat TSV-sopimukset viedä Materiaalitoriin?</h3>
          <p>
            Kunnan toissijaisesta jätehuoltopalvelusta tehdyt TSV-sopimukset, jotka on tehty ennen
            vuotta 2020, ovat voimassa sopimuskauden loppuun (maksimissaan 3 vuotta) eivätkä vuoden
            2020 alusta voimaan tulleen jätelain muutoksen mukaiset velvoitteet sellaisenaan koske
            niiden nojalla toteutettavaa jätehuoltopalvelua. Tiedot tällaisten sopimusten
            perusteella annetusta TSV-palvelusta on suositeltavaa toimittaa Materiaalitoriin, jotta
            lainmuutoksen perimmäinen tavoite eli TSV-palvelun käytön läpinäkyvyyden lisääminen
            toteutuisi mahdollisimman hyvin. Tiedot on mahdollista tuoda koontitietoina, kuten
            tiedot muusta TSV-palvelusta, joka jää Materiaalitorin käyttövelvoitteen ulkopuolelle.
            Koontitietoja ovat jätteen määrät jätelajeittain ja käsittelymenetelmittäin eriteltyinä.
          </p>

          <h3>Onko mahdollista saada TSV-pyynnöt sähköpostiin?</h3>
          <p>
            Kunnan toissijaista jätehuoltopalvelua koskeva TSV-pyyntö tulee asiakkaalta
            jätelaitokselle Materiaalitorin kautta. Saapuneesta pyynnöstä tulee sähköposti-ilmoitus
            jätelaitokselle jätelaitoksen omissa tiedoissaan määrittämään sähköpostiosoitteeseen.
          </p>

          <h3>Miten seurataan Materiaalitorin käyttövelvoitteen rajan (2 000 €) toteutumista?</h3>
          <p>
            Materiaalitoriin tulee tehdä jätelain mukainen tarjouspyyntö eli ilmoitus, mikäli
            tarvittavan kunnan toissijaisen jätehuoltopalvelun eli TSV-palvelun arvo ylittää 2000
            euroa vuodessa. Raja-arvo on yrityskohtainen ja sen seuraaminen on ensisijaisesti
            jätteen haltijan vastuulla. Jätteen haltijan on hyvä ennakoida palveluntarvettaan ja
            tehdä ilmoitus ajoissa Materiaalitoriin.{' '}
          </p>
          <p>
            Jätelaitoksille seurantavelvoitetta ei ole asetettu, mutta käytännössä jätelaitoksilla
            voi olla tarve seurata rajan ylittymistä, sillä jätelain hengen mukaisesti raja-arvon
            ylittävästä palvelusta TSV-sopimus tulisi tehdä vain tilanteissa, joissa Materiaalitoria
            on käytetty asianmukaisesti. Poikkeuksena tästä ovat ennalta-arvaamattomat
            kiiretilanteet.
          </p>

          <h3>
            Onko Materiaalitorin käyttövelvoitteen raja (2 000 €) arvonlisäverollinen vai veroton
            summa?
          </h3>
          <p>
            Asiasta ei ole säädetty jätelaissa. Kunnan toissijaisen jätehuoltopalvelun arvon
            laskemiseen mallia saattaisi saada julkisten hankintojen kynnysarvoista, jotka ovat
            arvolisäverottomia.
          </p>

          <h3>
            Mitä pitää tehdä, jos jäte ei jätelaitoksen portille tuotaessa vastaakaan sitä, mistä
            TSV-sopimuksessa on sovittu?
          </h3>
          <p>
            Tarjouspyynnön tekijä määrittelee jätteen ja siihen liittyvät olennaiset tiedot
            tehdessään tarjouspyyntöä Materiaalitoriin. Jos jäte tai muut tiedot eivät vastaa
            ilmoitettua, on TSV-palvelun edellytyksenä oleva muun palvelutarjonnan puute todettu
            väärillä tiedoilla, joten tilanteessa tulisi tehdä uusi tarjouspyyntö korjatuilla
            tiedoilla ja katsoa löytyykö sille markkinaehtoista palvelua. Kysymyksen tapauksessa
            virheellisesti määritelty jäte-erä on jo kuitenkin niin sanotusti jätelaitoksen
            portilla, joten jätelaitoksen tehtäväksi jää arvioida, onko jäte syytä vastaanottaa
            virheestä huolimatta. Palvelun pyytäjää on kuitenkin hyvä muistuttaa uuden korjatun
            tarjouspyynnön tekemisestä Materiaalitoriin, mikäli palveluntarve jatkuu. Jätelaitosten
            voi olla hyvä ennakoida tällaiset tilanteet myös TSV-palveluun liittyvissä
            sopimusehdoissa.
          </p>

          <h3>
            Jos TSV-sopimus tehdään ”muulle jätteelle” jätemääräarvion mukaisesti ja jätteet
            lajitellaan jäteasemalla useisiin jakeisiin, tuleeko eri jakeet raportoida
            Materiaalitoriin?
          </h3>
          <p>
            Lähtökohtana on, että tarjouspyynnössä jäte määritellään mahdollisimman tarkasti ja
            kuvaavasti. Mikäli valikosta ei löydy sopivaa jätelajia, voi valita ”muu jäte” ja kuvata
            jätettä vapaaseen kenttään. Mikäli kunnan toissijaisesta jätehuoltopalvelusta on tehty
            TSV-sopimus ja sen tiedot löytyvät Materiaalitorista, ei sopimuksen toteutumaa tarvitse
            raportoida Materiaalitoriin.
          </p>

          <h3>
            Pitääkö kaikista jätelajeista tehdä erilliset tarjouspyynnöt ja TSV-sopimukset vai voiko
            kaikki jätteet laittaa samaan yhteen tarjouspyyntöön?
          </h3>
          <p>
            Lähtökohtaisesti yhdestä jätelajista tehdään yksi tarjouspyyntö eli ilmoitus. Tällöin
            jätteelle on todennäköisesti helpointa löytää vastaanottaja. Joistakin sekalaisista
            jätteistä, kuten sekalaisesta rakennus- ja purkujätteestä, on myös mahdollista tehdä
            ilmoitus. Lisäksi joissakin tapauksissa voi tehdä ilmoituksen muusta jätteestä (”muu
            jäte”). Esimerkiksi haettaessa kiinteistön kokonaispalvelua useille erikseen kerätyille
            yhdyskuntajätteille, ilmoituksen voi tehdä muusta jätteestä ja kuvata jätteet tarkemmin
            vapaassa kentässä tai ilmoituksen liitteessä. Materiaalitorissa tehtävät sopimukset
            kunnan toissijaisesta palvelusta tehdään ilmoitusten pohjalta, jolloin tämä ns.
            TSV-sopimus koskee ilmoituksessa määriteltyä jätettä.{' '}
          </p>

          <h3>
            Onko yrityksen laitettava jäte-erä materiaalitorille, jos heillä on voimassa aiemmin
            tehty TSV sopimus?
          </h3>
          <p>
            TSV-sopimukset, jotka on tehty ennen vuotta 2020, ovat voimassa sopimuskauden loppuun
            (maksimissaan 3 vuotta). Tarjouspyyntöä ei tällöin kyseisestä jätteestä tarvitse tehdä,
            vaan sopimuskauden aikana jätteet voi toimittaa kunnan jätelaitokselle sovitulla
            tavalla.{' '}
          </p>

          <h3>Mitä teen, jos kunnan jätelaitos ei anna pyytämääni TSV-palvelua?</h3>
          <p>
            Materiaalitorissa asioidessa, pyyntö kunnan toissijaisesta jätehuoltopalvelusta
            kohdennetaan ensisijaisesti lähimmälle kunnan jätelaitokselle. Jos jätelaitos kuitenkin
            hylkää pyynnön, pyyntö palautuu pyytäjälle Materiaalitoriin, jolloin palvelupyynnön voi
            kohdentaa toiselle jätelaitokselle. Jätelaitos perustelee, miksi hylkää pyynnön eli ei
            voi antaa pyydettyä palvelua ja voi halutessaan samalla neuvoa pyynnön
            uudelleenkohdentamisessa. Pyynnön voi lähettää kerralla vain yhdelle jätelaitokselle.
          </p>

          <h3>Voiko kunnan jätelaitos ilmoittaa TSV-palvelunsa Materiaalitorille?</h3>
          <p>
            Kunnan toissijaisesta jätehuoltopalvelusta eli TSV-palvelusta ei ole
            tarkoituksenmukaista tehdä ilmoituksia Materiaalitoriin. Yleisesti ottaen lakisääteisiä
            palveluja, kuten TSV-palveluja, ei ole syytä markkinoida kuten markkinaehtoisia
            palveluja. Materiaalitoriin ilmoitetut TSV-palvelut voisivat sekoittua markkinaehtoisiin
            palveluihin. Materiaalitorissa kunnan jätelaitoksen on kuitenkin mahdollista tiedottaa
            tarjoamistaan TSV-palveluista siinä vaiheessa, kun TSV-palvelua pyydetään. Tiedot
            TSV-palveluista voi lisätä jätelaitoksen omissa tiedoissa.
          </p>

          <h3>
            Miten jätteen haltija voi harkita saamiensa tarjousten kohtuullisuutta, jos ei tiedä
            jätelaitoksen TSV-hintoja etukäteen?
          </h3>
          <p>
            Saatujen tarjousten kohtuullisuuden arvioon vaikuttanee moni asia, joista yksi saattaa
            olla tarjottujen palvelujen hintojen vertaaminen kunnan jätelaitosten hintoihin. Kuntien
            jätetaksat ovat julkista tietoa ja yleensä hinnasto löytyy esim. jätelaitosten
            nettisivuilta. Tarkemman hintatiedon saamiseksi voi olla yhteydessä jätelaitokseen.
            Markkinaehtoisen palvelun hinnan pieni poikkeama kunnan toissijaisen jätehuoltopalvelun
            eli TSV-palvelun hinnasta ei ole kuitenkaan riittävä peruste TSV-palvelulle.
          </p>

          <h3>
            Miten voidaan varmistaa, että TSV-palvelupyynnön toisen puolesta tehneellä yrityksellä
            on oikeus tehdä sopimus toisen yhtiön nimissä?
          </h3>
          <p>
            Materiaalitorissa tarjouspyynnön, TSV-palvelupyynnön ja TSV-sopimuksen voi tehdä jätteen
            haltijan lisäksi jätteen kuljettaja tai muu toimija, joka tarjoaa jätteen haltijalle
            esim. kokonaispalvelua (kuljetus ja käsittely). Tarjouspyynnössä, TSV-pyynnössä tai
            TSV-sopimuksessa ei tarvitse määrittää kenen jätteet alun perin ovat. Jätelaki ei
            myöskään edellytä valtakirjaa, mikäli osapuolena on joku muu kuin jätteen haltija.
            Jätteen haltija voi kuitenkin edellyttää palveluntarjoajalta esimerkiksi tietoja jätteen
            toimituspaikasta.
          </p>
          <p>
            Jos TSV-pyynnön tekee jätteen kuljettaja tai muu toimija, voi pyyntö koskea vain jätteen
            käsittelyä.
          </p>

          <p>
            <strong>
              Etkö löytänyt vastausta kysymykseesi? Ota yhteyttä{' '}
              <a href="mailto:materiaalitori@motiva.fi">materiaalitori@motiva.fi</a>.
            </strong>
          </p>
        </>
      );
    }
  }
};

export default Faq;
