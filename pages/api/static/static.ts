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
      data: "<p>Du blir tilldelad ditt första offer via den mejlen du anger vid anmälningstillfället. Därefter får du offrets offer och så vidare. </p><p>Exempel: Om A dödar B (och B skulle ha dödat C) så blir A's nya offer C.</p>",
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
      data: '<p>När du begått ett lyckat mord, utan att någon vittnar, ska du anmäla ditt mord via mail: <a href="mailto:enskildakiller@gmail.com">enskildakiller@gmail.com</a> (läs regel 6)</p>',
    },
    {
      title: "När du har blivit dödad",
      data: '<p>När du blivit dödad ska du anmäla det via mail: <a href="mailto:enskildakiller@gmail.com">enskildakiller@gmail.com</a> (läs regel 6)</p>',
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
      data: "<p>Dagens Vittnesbevis förekommer vissa dagar och innebär att man behöver ha ett specifikt föremål för att kunna bevittna ett mord. Medans ett vittnesbevis är aktivt så innebär det att vanliga vittnesmål inte fungerar som ett sätt att stoppa ett mord.</p><p>Gemensamt för både vapen och skydd är att de måste vara synliga vid användning och om det förekommer speciella instruktioner för hur de ska bäras är det viktigt att instruktionerna följs för att vapnet/skyddet ska vara giltigt.</p><p>Vapen, Skydd och Vittnesbevis annonseras på Enskilda Kårens Instagram. För att minimera risken att folk stannar hemma kan skydd komma att avslöjas samma dag som det gäller eller i form av så kallat flashvapen.</p><p>Löpande information under spelets gång hittar man här på hemsidan, däribland uppdateringar av regler och diverse statistik.</p>",
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
      data: "<p>Offret måste alltid kunna bevisa med schema att denne har lektion.</p><i>Undantag: Schemabrytande lektionstid måste kunna styrkas av lärare.</i><i>Avslutar läraren lektionen tidigare än vad schemat säger så är det inte längre lektion och man kan då bli dödad. (På resurstiden är skolbyggnaden alltid killerfri fram till 16.00)</i>",
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
      data: "<p>På onsdagar klockan 13.45 - 16.00 är det med andra ord killerfritt inne på skolan.</p>",
    },
    {
      title: "Alla mord ska registreras hos oss av både mördare och offer ",
      data: '<p>Detta görs via mail där man skriver: "Namn och klass" dödade "Namn och klass"</p><a href="mailto:enskildakiller@gmail.com">enskildakiller@gmail.com</a>',
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
      data: "<p>Självklart måste man vara hemma om man känner sig sjuk, men frånvaro kommer kontrolleras.</p><p>Om man är borta mer än fyra skoldagar i sträck eller på annat sätt har en återkommande frånvaro utan att kunna styrka sin sjukdom diskas man automatiskt. Vi kommer bli betydligt hårdare på detta under skydd- och vapendagar samt senare i Killer.</p>",
    },
    {
      title: "Studentpoäng",
      data: "<p><i>Preliminärt, kan komma att ändras</i></p><p>Studentpoängen i år kommer delas ut enligt följande:</p><ul><li>Till de tre klasser i trean som har högst procentuellt antal levande av det totala antalet medlemmar i klassen den 29 november 23:59. Antalet levande i procent ges av formeln: 100*Antal levande/ Antal i klassen. Notera att antal i klassen inte gäller antal anmälda, utan antalet i din klass totalt. Om din klass har 30 elever och 6 levande betyder det alltså att 20 procent av din klass lever.</li><li>Till de tre klasser i trean som har flest kills per person i klassen den 29 november 23:59. Kills per person i klassen bestäms enligt följande: Antal kills av klassen / Antal i klassen. Notera att antal i klassen inte gäller antal anmälda, utan antalet i din klass totalt. Om din klass har 28 elever och 30 kills så har klassen jämförelsevärdet 30/26 = ~1.11.</li></ul>",
    },
    {
      title: "Automatisk diskning och ändring av cirkeln",
      data: "<p>Beroende på hur många som lever när KILLER börjar närma sig sitt sluskede, kan eventuellt filter komma att tillämpas. Ett exempel på ett sådant filter kan vara att alla som dödat färre än x person(er) åker ut ett visst datum.</p><p>Om det bedöms möjligt att Killer kommer bli klart för tidigt, eller liknande misstanke, kan cirkeln komma att göras om för att förlänga spelets gång.</p>",
    },
  ],
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.json(data);
}
