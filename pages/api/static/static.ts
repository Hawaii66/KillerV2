// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { RuleInfo } from "../../../Interfaces/Interfaces";

type Data = {
  rules: RuleInfo[];
  howto: RuleInfo[];
};

export const data: Data = {
  howto: [
    {
      title: "Ditt Offer",
      data: "<p>Du blir tilldelad ditt första offer via fliken profil ovan där du loggar in med din <b>skolmail</b>. Vid ett lyckat mord får du ditt nästa offer under fliken profil </p><p>Exempel: Om A dödar B (och B skulle ha dödat C) så blir A's nya offer C.</p>",
    },
    {
      title: "Hur man utför ett mord",
      data: "<p>Du dödar ditt offer genom att gå fram till offret och säga “Du är död” samtidigt som du vidrör offret på axeln. Vittnesmål inom 5 sekunder eller användande av Dagens Skydd ogiltiggör mordet. Offret måste höra dödförklaringen (förutsatt att offret inte använder medel för att nedsätta hörseln, exempelvis med hörlurar eller hörselskydd).</p>",
    },
    {
      title: "Hur man vittnar",
      data: '<p>När man har sett ett mord äga rum har man ett val att vittna som åskådare. Detta gör man genom att säga "Jag vittnar". Vittnesmålet ogiltiggör mordet och offret är räddat. Vittnesmålet måste ske inom 5 sekunder efter att mordet har skett för att vara giltigt. Offret får ALDRIG be om vittnesmål efter att mordet begåtts. Ber man på något sätt om vittnesmål ogiltiggör man alla eventuella vittnesmål. Vittnesmålet måste höras av mördaren (förutsatt att mördaren inte använder medel för att nedsätta hörseln, exempelvis med hörlurar eller hörselskydd).</p>',
    },
    {
      title: "När du har begått ett mord",
      data: '<p>När du begått ett lyckat mord, utan att någon vittnar, ska du gå till fliken profil ovan och logga in med din skolmail. Klicka sedan på "jag har dödat" och godkän frågan som kommer upp. Vänta på att ditt offer gör samma sak och ladda sedan om sidan, mer information under regel 6</p>',
    },
    {
      title: "När du har blivit dödad",
      data: '<p>När du blivit dödad ska du gå till fliken profil ovan och logga in med din skolmail. Klicka sedan på "jag blev dödad" och godkänn frågan som kommer upp. Vänta på att din mörare och ladda sedan om hemsidan för att se din slutgilitliga statistik. Mer informaiton under regel 6.</p>',
    },
    {
      title: "Dagens Vapen",
      data: "<p>Dagens Vapen förekommer vissa dagar under spelets gång. Med vapnet kan man döda sitt offer oavsett vittnesmål eller ej. Vapnet kan förekomma i en rad olika former. För att minimera risken att folk stannar hemma kan vapen komma att avslöjas samma dag som det gäller eller i form av så kallat flashvapen. </p>",
    },
    {
      title: "Dagens Skydd",
      data: "<p>Dagens Skydd har samma koncept som vapnet men de två fyller olika funktioner. I stället för att kunna döda ditt offer oavsett vittnesmål så kan man med skyddet överleva mordförsök utan vittnesmål. Finns det både skydd och vapen samma dag är det skyddet som står över vapnet.</p>",
    },
    {
      title: "Dagens Vittnesbevis",
      data: "<p>Dagens Vittnesbevis förekommer vissa dagar och innebär att man behöver ha ett specifikt föremål för att kunna bevittna ett mord. Medans ett vittnesbevis är aktivt så innebär det att vanliga vittnesmål inte fungerar som ett sätt att stoppa ett mord.</p>",
    },
    {
      title: "Gemensamt för skydd, vapen & vittnesbevis",
      data: "<p>Gemensamt för både vapen och skydd är att de måste vara synliga vid användning och om det förekommer speciella instruktioner för hur de ska bäras är det viktigt att instruktionerna följs för att vapnet/skyddet ska vara giltigt.</p><p>Vapen, Skydd och Vittnesbevis annonseras på Enskilda Kårens Instagram. För att minimera risken att folk stannar hemma kan skydd komma att avslöjas samma dag som det gäller eller i form av så kallat flashvapen.</p><p>Löpande information under spelets gång hittar man här på hemsidan, däribland uppdateringar av regler och diverse statistik.</p>",
    },
  ],
  rules: [
    {
      title:
        "Blockad av väg till lektionssal är förbjuden om det hindrar eleven från att komma i tid till sin lektion. ",
      data: "<p>En blockad är när en mördare med vapen hindrar offret från att komma till sin lektion genom att stå framför lektionsalsdörren.</p><p>Offret måste alltid kunna bevisa med schema att denne har lektion.</p>",
    },
    {
      title:
        "Inga mord får begås under lektionstid, oavsett var offret befinner sig. ",
      data: "<p>Offret måste alltid kunna bevisa med schema att denne har lektion.</p><i>Undantag: Schemabrytande lektionstid måste kunna styrkas av lärare.</i><i>Avslutar läraren lektionen tidigare än vad schemat säger så är det inte längre lektion och man kan då bli dödad. (På resurstiden är skolbyggnaden alltid killerfri från 14.55 till 16.15)</i>",
    },
    {
      title: "Inga mord får begås i matsalen eller lärares arbetsrum",
      data: "<p>Matsalen, arbetsrum, grupprum med lås och toaletter får dock inte användas som tillflyktszon.</p>",
    },
    {
      title:
        "Våld får inte användas för att nå sitt offer eller för att hindra en mördare.",
      data: "",
    },
    {
      title: "Under Resurstiden gills hela skolbyggnaden som en lektionssal",
      data: "<p>På onsdagar klockan 14.55 - 16.15 är det med andra ord killerfritt inne på skolan.</p>",
    },
    {
      title: "Alla mord ska registreras hos oss av både mördare och offer ",
      data: '<p>Detta görs på hemsidan under fliken profil där du loggar in med din <b>skolmail</b> efter det klickar du på antingen "Jag blev dödad" eller "Jag har dödat". Vänta på att den andra klickar på den andra knappen och ladda om sidan efter några sekunder. Nu har du fått ditt nästa offer</p>',
    },
    {
      title:
        "Man får absolut inte byta offer med någon då detta skulle förstöra cirkeln ",
      data: "<p>Man får heller inte döda någon annan än sitt tilldelade offer</p><p>Bryter man mot någon av dessa regler förstör man för alla andra deltagare</p>",
    },
    {
      title: "Mord får bara begås mellan 7:00-20:00",
      data: "<p></p>",
    },
    {
      title: "Mord får inte begås hemma hos offret",
      data: "<p>Mord får heller inte göras på hemmets tillhörande område som bestäms enligt nedan:</p><ul><li>Villor och radhus är tillhörande tomt killerfri.</li><li>Lägenheter är trappuppgång(ar) killerfria.</li></ul>",
    },
    {
      title: "Man får endast försöka döda sitt offer en gång varje minut",
      data: "<p></p>",
    },
    {
      title:
        "Vid tvistemål som ej kan avgöras kommer ett slumpmässigt beslut tas",
      data: "<p>Detta gör vi efter att noga gått igenom de enskilda fallen och endast om det är absolut nödvändigt för att spelet ska kunna fortgå. </p><p>Det slumpmässiga valet ska göras genom att singla en slant</p>",
    },
    {
      title:
        "Matcher, Träningar, Körlektioner och annat som kräver stor koncentration är killerfria under tiden de pågår",
      data: "<p>Du kan dock bli mördad på väg till en träning eller när du precis slutat.</p>",
    },
    {
      title: "Arbetstid",
      data: "<p>Under arbetstid kan man varken bli dödad eller döda.</p><p>Offret måste alltid kunna bevisa att han/hon faktiskt jobbar.</p>",
    },
    {
      title: "Luciaträningen",
      data: "<p>När du är med och tränar inför Lucia räknas det som en vanlig lektion.</p>",
    },
    {
      title: "Flyktvägar",
      data: "<p>Det är inte tillåtet att använda fönster eller nödutgångar som flyktväg. Tillämpas någon av dessa som flyktväg kommer personen i fråga bli diskad direkt.</p>",
    },
    {
      title: "Olämpligt uppträdande",
      data: "<p>Det är förbjudet att sätta sig själv eller andra i fara eller hota andra deltagare på något sätt. Brytande mot denna regel kommer resultera i en omedelbar diskning.</p>",
    },
    {
      title: "Frånvaro",
      data: "<p>Självklart måste man vara hemma om man känner sig sjuk, men frånvaro kommer kontrolleras.</p><p>Om man är borta en längre period eller kontinuerligt blir det konsekvenser.</p>",
    },
    {
      title: "Studentpoäng",
      data: "<p>Student poäng delas ut i två kategorier</p><ul><li>De 3 klasser med flest överlevande i procent kommer få studentpoäng. Flest överlevande beräknas genom formeln: <br/>Antal Levnade (9/12 14:00)/Antal personer i klassen</li><br/><li>De 3 klasser med flest antal kills procentuellt kommer också få student poäng enligt formlen nedan: <br/>Antal Kills (9/12 14:00)/Antal personer i klassen</li></ul>",
    },
    {
      title: "Automatisk diskning och ändring av cirkeln",
      data: "<p>Förändringar på cirkeln kan komma att ske under spelets gång, håll utkik på instagram @enskildakaren</p>",
    },
    {
      title:"Tvistemål",
      data:"<p>Är du med i ett tvistemål får du <b>inte</b> döda ditt offer. Mördaren får alltså inte döda sitt offer och offret får inte döda sitt offer.</p>"
    }
  ],
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.json(data);
}
