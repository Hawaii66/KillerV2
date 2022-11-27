// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { RuleInfo } from "../../../Interfaces/Interfaces";

export type Data = {
  rules: RuleInfo[];
  howto: RuleInfo[];
};

export const data: Data = {
  howto: [
    {
      title: "Killer",
      data: "Spelet går ut på att döda sitt specifika offer och undvika att bli mördad. När du dödat ditt offer får du nästa person i cirkeln och kan fortsätta din räd mot finalen.",
    },
    {
      title: "Offer",
      data: "Alla är ett offer till sin mördare. Som offer ska du undvika att bli mördad.",
    },
    {
      title: "Mördare",
      data: "Som mördare är ditt mål är att mörda ditt offer. Du mördar genom att placera din hand på offrets axel och säga ”Du är död”.",
    },
    {
      title: "Mord",
      data: "Du dödar ditt offer genom att lägga handen på offrets axel och säga du är död så att offret hör det. Ett vittnesmål förhindrar mordet.",
    },
    {
      title: "VITTNA",
      data: "Om någon vittnar inom 5 sekunder är mordet misslyckat. Du vittnar genom att säga ”jag vittnar”. Vittnesmål räknas inte över exempelvis telefon och Teams.",
    },
    {
      title: "TVISTEMÅL",
      data: "Om mördare och offer inte är överens om ett mords giltighet är det ett tvistemål. Båda parterna ska anmäla ett tvistemål på hemsidan. Båda kommer berätta vad som har hänt och får kalla ett vittne var. Killerutskottet kommer bedöma situationen och avgöra om mordet var giltigt eller inte. Under ett tvistemål får varken offer eller mördare fortsätta mörda. ",
    },
    {
      title: "PROFILEN",
      data: "Ditt konto på hemsidan. Du loggar in med din skolmail och kan se ditt offer med mera. Det är här du anmäler både din död, dina mord och eventuella tvistemål.",
    },
    {
      title: "SPECIELLA FÖREMÅL",
      data: "Dessa föremål ska hållas i handen och vara synliga vid användning. Om det är klädesplagg ska det vara det yttersta plagget. Andra krav för användning kan förekomma och annonseras i så fall tillsammans med föremålet på hemsidan och på Instagram @enskildakaren. ",
    },
    {
      title: "VAPEN",
      data: "Med vapnet kan man döda sitt offer oavsett vittnesmål.",
    },
    {
      title: "VITTNESBEVIS",
      data: "Om vittnesbevis förekommer kan du endast vittna om du använder det specifika föremålet. Vanliga vittnesmål fungerar alltså inte.",
    },
    {
      title: "DRÅP",
      data: "Om dråp förekommer kan du endast mörda om du använder det specifika föremålet. Vanliga mord fungerar alltså inte.",
    },
    {
      title: "SKYDD",
      data: "Med skyddet kan offret överleva alla mordförsök, oavsett vapen. Skyddet kan inte användas av flera personer samtidigt och måste användas på ett korrekt sätt när mordförsöket sker för att det ska räknas. Du får lämna över skyddet till en person INNAN mordet sker. Skydd står över vapen och dråp. ",
    },
    {
      title: "BOXEN",
      data: "En plats på skolan som när X antal personer står i den gör alla i boxen immuna för resten av dagen. Du kan dö på vägen till boxen även om du har lektion och i boxen innan boxens personer blir immuna. Bara personer som är med i Killer får stå i boxen.",
    },
    {
      title: "Immuna",
      data: "Personer som är immuna kan inte dö under den dagen. Immunitet får inte överlämnas till en annan person.",
    },
    {
      title: "FLASH",
      data: "Detta är ett vapen/vittnesbevis/skydd/dråp som endast är giltigt under en kort tidsperiod.",
    },
    {
      title: "KILLERFRITT",
      data: "Om ett område är Killerfritt kan inga mord begås i det området. Killerfria områden är vanligtvis begränsade i exempelvis tid, fysisk plats och till vissa personer. Personer som innefattas av ett killerfritt område kan varken mörda eller mördas.",
    },
    {
      title: "KILLERSTOPP",
      data: "Vid särskilda händelser kommer Killerstopp annonseras på hemsidan och på Instagram @enskildakaren. Under Killerstopp kan man varken dö eller bli dödad.",
    },
    {
      title: "SPÄRR",
      data: "I Killer kan spärrar där deltagare med färre än X antal kills är ute ur Killer.",
    },
    {
      title: "CIRKELN",
      data: "Den ordning som alla deltagare blivit placerade i. Ordningen avgör vem du ska mörda.",
    },
    {
      title: "CIRKELÄNDRING",
      data: "Cirkeln kan under spelets gång kastas om. Detta annonseras på hemsidan och på Instagram @enskildakaren. Även om det sker slumpmässigt kan du få samma offer igen.",
    },
    {
      title: "DE DÖDAS CIRKEL",
      data: "Här får alla döda en andra chans. Vinnarna av De dödas cirkel får en andra chans i den vanliga cirkeln.",
    },
    {
      title: "MÖRDARVECKAN",
      data: "Att komma skall.",
    },
    {
      title: "KILLERFRIA OMRÅDEN",
      data: "<p>I dessa områden kan man varken mörda eller mördas.</p><ul><li>Matsalen, från plexiglaset</li><li>Klassrum under lektionstid eller handledning</li><li>Arbetsrum</li></ul>",
    },
  ],
  rules: [
    {
      title:
        "Mördare och offer kan ej ha lektion eller prov när ett mord begås.",
      data: "<ul><li>Offret och mördaren måste alltid kunna bevisa med schema att denne har respektive inte har lektion.</li><li>Lektionen börjar enligt tid i schemat och avslutas när läraren säger att lektionen är slut. Man kan dö och döda om man har eget arbete UTAN återsamling. </li><li>Prov är avslutade när man lämnar in provet och lämnar salen. </li><li>Stugor är killerfria i den salen. </li><li>Handledning måste styrkas av lärare. </li><li>Resurstiden är killerfri i skolbyggnaden.</li></ul>",
    },
    {
      title:
        "Som offer får man inte hinta om vittnesmål eller avslöja ett mord.",
      data: "<ul><li>Offer får inte be om eller på något sätt hinta om att någon ska vittna från att ett mordförsök påbörjats, det vill säga då mördarens hand ligger på offrets axel.</li><li>Om offret hintar om eller avslöjar mordet ogiltiggörs alla vittnesmål för det mordet</li></ul>",
    },
    {
      title:
        "Du får inte använda en tillflyktzon för att undvika att bli mördad.",
      data: "Tillflyktzoner är killerfria områden och låsningsbara utrymmen",
    },
    {
      title:
        "Alla som är involverade vid mordtillfällen där våld brukas riskerar att bli diskade.",
      data: "",
    },
    {
      title: "Alla godkända mord ska registreras av offer och mördare.",
      data: "Detta görs på hemsidan under fliken profil där du loggar in med din skolmail efter det du klickar du på antingen ”Jag blev dödad” eller ”Jag har dödat”. Vänta på att den andra klickar på den andra knappen och ladda om sidan efter några sekunder. Nu har du fått ditt nya offer.",
    },
    {
      title: "Alla tvistemål registreras via profilen på hemsidan.",
      data: "<ul><li>Ett tvistemål är när mördare och offer inte är överens om ett mords giltighet</li><li>Under ett tvistemål kan varken mördare eller offer mörda.</li><li>Tvistemålet börjar när mordet har skett och upphör när beslutet tagits av Killerutskottet.</li><li>I regel tar vi endast emot tvistemål som anmäls innan mordet har registrerats.</li></ul>",
    },
    {
      title: "Man får inte döda någon annan än sitt offer. ",
      data: "Om du lägger handen på axeln och säger du är död är detta ett mordförsök. Du får endast genomföra gesten på ditt offer. ",
    },
    {
      title:
        "Mord får inte begås hemma hos offret eller på hemmets tillhörande område.",
      data: "<ul><li>För villor och radhus kan offret inte dö på tomt och garageuppfart.</li><li>För lägenheter kan offret inte dö från porten (inkluderar trappuppgång).</li></ul>",
    },
    {
      title:
        "Vid aktivitet utanför skolan som kräver stor koncentration är det killerfritt under pågående tid.",
      data: "<ul><li>Du kan dock bli mördad till och från aktiviteten</li><li>Exempelvis: Schemalagd träning, körlektion, och matcher.</lI></ul>",
    },
    {
      title:
        "Vid aktiviteter inom skolan som kräver stor koncentration är det killerfritt.",
      data: "Exempel på aktiviteter som räknas är möten med SkolIF, Enskildakåren, Luciaträning, och skolresor. Skolresor är killerfria från att du kliver på bussen tills den avslutas när du kliver av bussen hemåt.",
    },
    {
      title: "Under arbetstid kan man inte bli mördad.",
      data: "Offret måste kunna bevisa att denne jobbar.",
    },
    {
      title:
        "Du kan mördas men inte mörda under lektioner du är frånvaroanmäld/frånvarande från.",
      data: "",
    },
    {
      title: "Du blir diskad om du är frånvarande 3 dagar i rad.",
      data: "Om du tror att ditt offer varit sjuk i 3 dagar kan du höra av dig till oss.",
    },
    {
      title: "Man får inte … i skolbyggnaden.",
      data: "<ul><li>Springa</li><li>Hoppa genom fönster</li><li>Använda nödutgångar så länge det inte är nödläge (brandlarm)</li></ul>",
    },
    {
      title:
        "Regler från tidigare år, tidigare i år och tidigare förtydliganden gäller inte",
      data: "",
    },
    {
      title: "Olämpligt uppträdande",
      data: "<ul><li>Det är förbjudet att sätta sig själv eller andra i fara eller hota andra deltagare på något sätt.</li><li>Svensk lag gäller givetvis</li><li>I andra fall där Killerutskottet finner att deltagare agerat på olämpligt vis har Killerutskottet möjlighet att diska dem deltagarna.</li></ul>",
    },
    {
      title: "Brott mot reglerna innebär att du riskerar diskning.",
      data: "",
    },
    {
      title:
        "Killerutskottet får inte vittna eller hinta för att andra ska vittna.",
      data: "",
    },
    {
      title: "Killerutskottet har alltid sista ordet.",
      data: "",
    },
    {
      title: "Glöm inte fair play.",
      data: "Acceptera att du är dödlig.",
    },
  ],
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.json(data);
}
