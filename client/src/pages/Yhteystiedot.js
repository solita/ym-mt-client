import React from 'react';
import { getFeedbackUrlFi, getFeedbackUrlSv } from '../utils/config-utils';

const Ohjeet = ({ lang, title }) => {
  switch (lang) {
    case 'sv-FI':
      return (
        <>
          <h1>{title}</h1>
          <p>
            Feedback om användning av tjänsten gärna genom att besvara{' '}
            <a href={getFeedbackUrlSv()} rel="noreferrer noopener" target="_blank">
              {' '}
              enkäten.
            </a>{' '}
            Tack för din hjälp med att utveckla tjänsten!
          </p>
          <p>
            Vi ber dig skicka andra meddelanden gällande tjänsten i första hand till e-postadressen
            nedan. Telefontjänsten är öppen tisdagar kl. 9–11 och torsdagar kl. 13–15
          </p>
          <p>
            Ta kontakt i första hand per e-post: <br />
            materiaalitori@motiva.fi
          </p>

          <p>
            Telefon (09) 6122 5080
            <br />
            tisdagar 9–11
            <br />
            torsdagar 13–15
          </p>
        </>
      );

    default: {
      return (
        <>
          <h1>{title}</h1>

          <p>
            Palautteet palvelun käytöstä mielellään vastaamalla{' '}
            <a href={getFeedbackUrlFi()} rel="noreferrer noopener" target="_blank">
              kyselyyn.
            </a>{' '}
            Kiitos avustasi palvelun kehittämisessä!
          </p>
          <p>
            Muut palvelua koskevat yhteydenotot pyydetään toimittamaan ensisijaisesti alla olevaan
            sähköpostiosoitteeseen. Puhelinpalvelu toimii tiistaisin klo 9-11 ja torstaisin klo
            13-15
          </p>
          <p>
            Yhteydentotot ensisijaisesti sähköpostilla: <br />
            materiaalitori@motiva.fi
          </p>

          <p>
            Puhelin (09) 6122 5080
            <br />
            tiistaisin 9-11
            <br />
            torstaisin 13-15
          </p>
        </>
      );
    }
  }
};

export default Ohjeet;
