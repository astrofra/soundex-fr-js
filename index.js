import {_} from 'lodash';

/**
 * @author E. Bergé
 * @translated from PHP to Javascript by Jean-Elie Barjonet
 *
 * NOTE THAT YOU NEED TO INCLUDE LODASH IN YOUR PROJECT (see import above)
 */

/**
 * Compute a french soundex of a string
 * @param sIn string to translate into soundex
 * @param maxLength maximum size of output soundex
 *
 * Usage : Soundex.phonetic("Gendarme") => JANDARM
 */
export const Soundex = {
    phonetic: function (sIn, maxLength = 256) {
        const accents = {
            'É': 'E', 'È': 'E', 'Ë': 'E', 'Ê': 'E', 'Á': 'A', 'À': 'A', 'Ä': 'A', 'Â': 'A',
            'Å': 'A', 'Ã': 'A', 'Æ': 'E', 'Ï': 'I', 'Î': 'I', 'Ì': 'I', 'Í': 'I',
            'Ô': 'O', 'Ö': 'O', 'Ò': 'O', 'Ó': 'O', 'Õ': 'O', 'Ø': 'O', 'Œ': 'OEU',
            'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U', 'Ñ': 'N', 'Ç': 'S', '¿': 'E'
        };

        const min2maj = {
            'é': 'É', 'è': 'È', 'ë': 'Ë', 'ê': 'Ê', 'á': 'Á', 'â': 'Â', 'à': 'À', 'Ä': 'A',
            'Â': 'A', 'å': 'Å', 'ã': 'Ã', 'æ': 'Æ', 'ï': 'Ï', 'î': 'Î', 'ì': 'Ì', 'í': 'Í',
            'ô': 'Ô', 'ö': 'Ö', 'ò': 'Ò', 'ó': 'Ó', 'õ': 'Õ', 'ø': 'Ø', 'œ': 'Œ',
            'ú': 'Ú', 'ù': 'Ù', 'û': 'Û', 'ü': 'Ü', 'ç': 'Ç', 'ñ': 'Ñ', 'ß': 'S'
        };

        // minuscules accentuées ou composées en majuscules simples
        _.toPairs(min2maj).forEach(function (value) {
            sIn = sIn.replace(value[0], value[1]);
        });
        // majuscules accentuées ou composées en majuscules simples
        _.toPairs(accents).forEach(function (value) {
            sIn = sIn.replace(value[0], value[1]);
        });
        // on passe tout le reste en majuscules
        sIn = sIn.toUpperCase();
        // on garde uniquement les lettres de A à Z
        sIn = sIn.replace(/[^A-Z]/g, '');

        // on sauve le code (utilisé pour les mots très courts)
        const sBack = sIn;

        sIn = sIn.replace(/O[O]+/g, 'OU'); 	// pré traitement OO... -> OU
        sIn = sIn.replace(/SAOU/g, 'SOU'); 	// pré traitement SAOU -> SOU
        sIn = sIn.replace(/OES/g, 'OS'); 	// pré traitement OES -> OS
        sIn = sIn.replace(/CCH/g, 'K'); 		// pré traitement CCH -> K
        sIn = sIn.replace(/CC([IYE])/g, 'KS$1'); // CCI CCY CCE
        sIn = sIn.replace(/(.)\1/g, '$1'); 	// supression des répétitions

        // quelques cas particuliers
        if (sIn == "CD") return (sIn);
        if (sIn == "BD") return (sIn);
        if (sIn == "BV") return (sIn);
        if (sIn == "TABAC") return ("TABA");
        if (sIn == "FEU") return ("FE");
        if (sIn == "FE") return (sIn);
        if (sIn == "FER") return (sIn);
        if (sIn == "FIEF") return (sIn);
        if (sIn == "FJORD") return (sIn);
        if (sIn == "GOAL") return ("GOL");
        if (sIn == "FLEAU") return ("FLEO");
        if (sIn == "HIER") return ("IER");
        if (sIn == "HEU") return ("E");
        if (sIn == "HE") return ("E");
        if (sIn == "OS") return (sIn);
        if (sIn == "RIZ") return ("RI");
        if (sIn == "RAZ") return ("RA");

        // pré-traitements
        sIn = sIn.replace(/OIN[GT]$/g, 'OIN');									// terminaisons OING -> OIN
        sIn = sIn.replace(/E[RS]$/g, 'E'); 										// supression des terminaisons infinitifs et participes pluriels
        sIn = sIn.replace(/(C|CH)OEU/g, 'KE'); 									// pré traitement OEU -> EU
        sIn = sIn.replace(/MOEU/g, 'ME'); 										// pré traitement OEU -> EU
        sIn = sIn.replace(/OE([UI]+)([BCDFGHJKLMNPQRSTVWXZ])/g, 'E$1$2'); 		// pré traitement OEU OEI -> E
        sIn = sIn.replace(/^GEN[TS]$/g, 'JAN');									// pré traitement GEN -> JAN
        sIn = sIn.replace(/CUEI/g, 'KEI'); 										// pré traitement accueil
        sIn = sIn.replace(/([^AEIOUYC])AE([BCDFGHJKLMNPQRSTVWXZ])/g, '$1E$2'); 	// pré traitement AE -> E
        sIn = sIn.replace(/AE([QS])/g, 'E$1'); 									// pré traitement AE -> E
        sIn = sIn.replace(/AIE([BCDFGJKLMNPQRSTVWXZ])/g, 'AI$1');				// pré-traitement AIE(consonne) -> AI
        sIn = sIn.replace(/ANIEM/g, 'ANIM'); 									// pré traitement NIEM -> NIM
        sIn = sIn.replace(/(DRA|TRO|IRO)P$/g, '$1'); 							// P terminal muet
        sIn = sIn.replace(/(LOM)B$/g, '$1'); 									// B terminal muet
        sIn = sIn.replace(/(RON|POR)C$/g, '$1'); 								// C terminal muet
        sIn = sIn.replace(/PECT$/g, 'PET'); 										// C terminal muet
        sIn = sIn.replace(/ECUL$/g, 'CU'); 										// L terminal muet
        sIn = sIn.replace(/(CHA|CA|E)M(P|PS)$/g, '$1N'); 		 				// P ou PS terminal muet
        sIn = sIn.replace(/(TAN|RAN)G$/g, '$1'); 			 					// G terminal muet


        // sons YEUX
        sIn = sIn.replace(/([^VO])ILAG/g, '$1IAJ');
        sIn = sIn.replace(/([^TRH])UIL(AR|E)(.+)/g, '$1UI$2$3');
        sIn = sIn.replace(/([G])UIL([AEO])/g, '$1UI$2');
        sIn = sIn.replace(/([NSPM])AIL([AEO])/g, '$1AI$2');
        let convMIn = ["DILAI", "DILON", "DILER", "DILEM", "RILON", "TAILE", "GAILET", "AILAI", "AILAR",
            "OUILA", "EILAI", "EILAR", "EILER", "EILEM", "REILET", "EILET", "AILOL"];
        let convMOut = ["DIAI", "DION", "DIER", "DIEM", "RION", "TAIE", "GAIET", "AIAI", "AIAR",
            "OUIA", "AIAI", "AIAR", "AIER", "AIEM", "RAIET", "EIET", "AIOL"];
        _.zip(convMIn, convMOut).forEach(function (value) {
            sIn = sIn.replace(value[0], value[1]);
        });
        sIn = sIn.replace(/([^AEIOUY])(SC|S)IEM([EA])/g, '$1$2IAM$3'); 	// IEM -> IAM
        sIn = sIn.replace(/^(SC|S)IEM([EA])/g, '$1IAM$2'); 				// IEM -> IAM

        // MP MB -> NP NB
        convMIn = ['OMB', 'AMB', 'OMP', 'AMP', 'IMB', 'EMP', 'GEMB', 'EMB', 'UMBL', 'CIEN'];
        convMOut = ['ONB', 'ANB', 'ONP', 'ANP', 'INB', 'ANP', 'JANB', 'ANB', 'INBL', 'SIAN'];
        _.zip(convMIn, convMOut).forEach(function (value) {
            sIn = sIn.replace(value[0], value[1]);
        });

        // Sons en K
        sIn = sIn.replace(/^ECHO$/g, 'EKO'); 	// cas particulier écho
        sIn = sIn.replace(/^ECEUR/g, 'EKEUR'); 	// cas particulier écœuré
        // Choléra Chœur mais pas chocolat!
        sIn = sIn.replace(/^CH(OG+|OL+|OR+|EU+|ARIS|M+|IRO|ONDR)/g, 'K$1'); 				//En début de mot
        sIn = sIn.replace(/(YN|RI)CH(OG+|OL+|OC+|OP+|OM+|ARIS|M+|IRO|ONDR)/g, '$1K$2'); 	//Ou devant une consonne
        sIn = sIn.replace(/CHS/g, 'CH');
        sIn = sIn.replace(/CH(AIQ)/g, 'K$1');
        sIn = sIn.replace(/^ECHO([^UIPY])/g, 'EKO$1');
        sIn = sIn.replace(/ISCH(I|E)/g, 'ISK$1');
        sIn = sIn.replace(/^ICHT/g, 'IKT');
        sIn = sIn.replace(/ORCHID/g, 'ORKID');
        sIn = sIn.replace(/ONCHIO/g, 'ONKIO');
        sIn = sIn.replace(/ACHIA/g, 'AKIA');			// retouche ACHIA -> AKIA
        sIn = sIn.replace(/([^C])ANICH/g, '$1ANIK');	// ANICH -> ANIK 	1/2
        sIn = sIn.replace(/OMANIK/g, 'OMANICH'); 	// cas particulier 	2/2
        sIn = sIn.replace(/ACHY([^D])/g, 'AKI$1');
        sIn = sIn.replace(/([AEIOU])C([BDFGJKLMNPQRTVWXZ])/g, '$1K$2'); // voyelle, C, consonne sauf H
        let convPrIn = ['EUCHA', 'YCHIA', 'YCHA', 'YCHO', 'YCHED', 'ACHEO', 'RCHEO', 'RCHES',
            'ECHN', 'OCHTO', 'CHORA', 'CHONDR', 'CHORE', 'MACHM', 'BRONCHO', 'LICHOS', 'LICHOC'];
        let convPrOut = ['EKA', 'IKIA', 'IKA', 'IKO', 'IKED', 'AKEO', 'RKEO', 'RKES',
            'EKN', 'OKTO', 'KORA', 'KONDR', 'KORE', 'MAKM', 'BRONKO', 'LIKOS', 'LIKOC'];
        _.zip(convPrIn, convPrOut).forEach(function (value) {
            sIn = sIn.replace(value[0], value[1]);
        });

        // Weuh (perfectible)
        convPrIn = ['WA', 'WO', 'WI', 'WHI', 'WHY', 'WHA', 'WHO'];
        convPrOut = ['OI', 'O', 'OUI', 'OUI', 'OUI', 'OUA', 'OU'];
        _.zip(convPrIn, convPrOut).forEach(function (value) {
            sIn = sIn.replace(value[0], value[1]);
        });

        // Gueu, Gneu, Jeu et quelques autres
        convPrIn = ['GNES', 'GNET', 'GNER', 'GNE', 'GI', 'GNI', 'GNA', 'GNOU', 'GNUR', 'GY', 'OUGAIN',
            'AGEOL', 'AGEOT', 'GEOLO', 'GEOM', 'GEOP', 'GEOG', 'GEOS', 'GEORG', 'GEOR', 'NGEOT', 'UGEOT', 'GEOT', 'GEOD', 'GEOC', 'GEO', 'GEA', 'GE',
            'QU', 'Q', 'CY', 'CI', 'CN', 'ICM', 'CEAT', 'CE',
            'CR', 'CO', 'CUEI', 'CU', 'VENCA', 'CA', 'CS', 'CLEN', 'CL', 'CZ', 'CTIQ',
            'CTIF', 'CTIC', 'CTIS', 'CTIL', 'CTIO', 'CTI', 'CTU', 'CTE', 'CTO', 'CTR', 'CT', 'PH', 'TH',
            'OW', 'LH', 'RDL', 'CHLO', 'CHR', 'PTIA'];
        convPrOut = ['NIES', 'NIET', 'NIER', 'NE', 'JI', 'NI', 'NIA', 'NIOU', 'NIUR', 'JI', 'OUGIN',
            'AJOL', 'AJOT', 'JEOLO', 'JEOM', 'JEOP', 'JEOG', 'JEOS', 'JORJ', 'JEOR', 'NJOT', 'UJOT', 'JEOT', 'JEOD', 'JEOC', 'JO', 'JA', 'JE',
            'K', 'K', 'SI', 'SI', 'KN', 'IKM', 'SAT', 'SE',
            'KR', 'KO', 'KEI', 'KU', 'VANSA', 'KA', 'KS', 'KLAN', 'KL', 'KZ', 'KTIK',
            'KTIF', 'KTIS', 'KTIS', 'KTIL', 'KSIO', 'KTI', 'KTU', 'KTE', 'KTO', 'KTR', 'KT', 'F', 'T',
            'OU', 'L', 'RL', 'KLO', 'KR', 'PSIA'];
        _.zip(convPrIn, convPrOut).forEach(function (value) {
            sIn = sIn.replace(value[0], value[1]);
        });

        sIn = sIn.replace(/GU([^RLMBSTPZN])/g, 'G$1'); // Gueu !
        sIn = sIn.replace(/GNO([MLTNRKG])/g, 'NIO$1'); // GNO ! Tout sauf S pour gnos
        sIn = sIn.replace(/GNO([MLTNRKG])/g, 'NIO$1'); // bis -> gnognotte! Si quelqu'un sait le faire en une seule regexp...


        // TI -> SI v2.0
        convPrIn = ['BUTIE', 'BUTIA', 'BATIA', 'ANTIEL', 'RETION', 'ENTIEL', 'ENTIAL', 'ENTIO', 'ENTIAI', 'UJETION', 'ATIEM', 'PETIEN',
            'CETIE', 'OFETIE', 'IPETI', 'LBUTION', 'BLUTION', 'LETION', 'LATION', 'SATIET'];
        convPrOut = ['BUSIE', 'BUSIA', 'BASIA', 'ANSIEL', 'RESION', 'ENSIEL', 'ENSIAL', 'ENSIO', 'ENSIAI', 'UJESION', 'ASIAM', 'PESIEN',
            'CESIE', 'OFESIE', 'IPESI', 'LBUSION', 'BLUSION', 'LESION', 'LASION', 'SASIET'];
        _.zip(convPrIn, convPrOut).forEach(function (value) {
            sIn = sIn.replace(value[0], value[1]);
        });
        sIn = sIn.replace(/(.+)ANTI(AL|O)/g, '$1ANSI$2'); // sauf antialcoolique, antialbumine, antialarmer, ...
        sIn = sIn.replace(/(.+)INUTI([^V])/g, '$1INUSI$2'); // sauf inutilité, inutilement, diminutive, ...
        sIn = sIn.replace(/([^O])UTIEN/g, '$1USIEN'); // sauf soutien, ...
        sIn = sIn.replace(/([^DE])RATI[E]$/g, '$1RASI$2'); // sauf xxxxxcratique, ...
        // TIEN TION -> SIEN SION v3.1
        sIn = sIn.replace(/([^SNEU]|KU|KO|RU|LU|BU|TU|AU)T(IEN|ION)/g, '$1S$2');


        // H muet
        sIn = sIn.replace(/([^CS])H/g, '$1'); 	// H muet
        sIn = sIn.replace(/ESH/g, "ES");			// H muet
        sIn = sIn.replace(/NSH/g, "NS");			// H muet
        sIn = sIn.replace(/SH/g, "CH");				// ou pas!

        // NASALES
        let convNasIn = ['OMT', 'IMB', 'IMP', 'UMD', 'TIENT', 'RIENT', 'DIENT', 'IEN',
            'YMU', 'YMO', 'YMA', 'YME', 'YMI', 'YMN', 'YM', 'AHO', 'FAIM', 'DAIM', 'SAIM', 'EIN', 'AINS'];
        let convNasOut = ['ONT', 'INB', 'INP', 'OND', 'TIANT', 'RIANT', 'DIANT', 'IN',
            'IMU', 'IMO', 'IMA', 'IME', 'IMI', 'IMN', 'IN', 'AO', 'FIN', 'DIN', 'SIN', 'AIN', 'INS'];
        _.zip(convNasIn, convNasOut).forEach(function (value) {
            sIn = sIn.replace(value[0], value[1]);
        });
        // AIN -> IN v2.0
        sIn = sIn.replace(/AIN$/g, 'IN');
        sIn = sIn.replace(/AIN([BTDK])/g, 'IN$1');
        // UN -> IN
        sIn = sIn.replace(/([^O])UND/g, '$1IND'); // aucun mot français ne commence par UND!
        sIn = sIn.replace(/([JTVLFMRPSBD])UN([^IAE])/g, '$1IN$2');
        sIn = sIn.replace(/([JTVLFMRPSBD])UN$/g, '$1IN');
        sIn = sIn.replace(/RFUM$/g, 'RFIN');
        sIn = sIn.replace(/LUMB/g, 'LINB');
        // EN -> AN
        sIn = sIn.replace(/([^BCDFGHJKLMNPQRSTVWXZ])EN/g, '$1AN');
        sIn = sIn.replace(/([VTLJMRPDSBFKNG])EN([BRCTDKZSVN])/g, '$1AN$2'); // deux fois pour les motifs recouvrants malentendu, pendentif, ...
        sIn = sIn.replace(/([VTLJMRPDSBFKNG])EN([BRCTDKZSVN])/g, '$1AN$2'); // si quelqu'un sait faire avec une seule regexp!
        sIn = sIn.replace(/^EN([BCDFGHJKLNPQRSTVXZ]|CH|IV|ORG|OB|UI|UA|UY)/g, 'AN$1');
        sIn = sIn.replace(/(^[JRVTH])EN([DRTFGSVJMP])/g, '$1AN$2');
        sIn = sIn.replace(/SEN([ST])/g, 'SAN$1');
        sIn = sIn.replace(/^DESENIV/g, 'DESANIV');
        sIn = sIn.replace(/([^M])EN(UI)/g, '$1AN$2');
        sIn = sIn.replace(/(.+[JTVLFMRPSBD])EN([JLFDSTG])/g, '$1AN$2');
        // EI -> AI
        sIn = sIn.replace(/([VSBTNRLPM])E[IY]([ACDFRJLGZ])/g, '$1AI$2');

        // Histoire d'Ô
        convNasIn = ['EAU', 'EU', 'Y', 'EOI', 'JEA', 'OIEM', 'OUANJ', 'OUA', 'OUENJ'];
        convNasOut = ['O', 'E', 'I', 'OI', 'JA', 'OIM', 'OUENJ', 'OI', 'OUANJ'];
        _.zip(convNasIn, convNasOut).forEach(function (value) {
            sIn = sIn.replace(value[0], value[1]);
        });
        sIn = sIn.replace(/AU([^E])/g, 'O$1'); // AU sans E qui suit

        // Les retouches!
        sIn = sIn.replace(/^BENJ/g, 'BINJ');				// retouche BENJ -> BINJ
        sIn = sIn.replace(/RTIEL/g, 'RSIEL');			// retouche RTIEL -> RSIEL
        sIn = sIn.replace(/PINK/g, 'PONK');				// retouche PINK -> PONK
        sIn = sIn.replace(/KIND/g, 'KOND');				// retouche KIND -> KOND
        sIn = sIn.replace(/KUM(N|P)/g, 'KON$1');			// retouche KUMN KUMP
        sIn = sIn.replace(/LKOU/g, 'LKO');				// retouche LKOU -> LKO
        sIn = sIn.replace(/EDBE/g, 'EBE');				// retouche EDBE pied-bœuf
        sIn = sIn.replace(/ARCM/g, 'ARKM');				// retouche SCH -> CH
        sIn = sIn.replace(/SCH/g, 'CH');					// retouche SCH -> CH
        sIn = sIn.replace(/^OINI/g, 'ONI');				// retouche début OINI -> ONI
        sIn = sIn.replace(/([^NDCGRHKO])APT/g, '$1AT');	// retouche APT -> AT
        sIn = sIn.replace(/([L]|KON)PT/g, '$1T');		// retouche LPT -> LT
        sIn = sIn.replace(/OTB/g, 'OB');					// retouche OTB -> OB (hautbois)
        sIn = sIn.replace(/IXA/g, 'ISA');				// retouche IXA -> ISA
        sIn = sIn.replace(/TG/g, 'G');					// retouche TG -> G
        sIn = sIn.replace(/^TZ/g, 'TS');					// retouche début TZ -> TS
        sIn = sIn.replace(/PTIE/g, 'TIE');				// retouche PTIE -> TIE
        sIn = sIn.replace(/GT/g, 'T');					// retouche GT -> T
        sIn = sIn.replace(/ANKIEM/, "ANKILEM");			// retouche tranquillement
        sIn = sIn.replace(/(LO|RE)KEMAN/, "$1KAMAN");	// KEMAN -> KAMAN
        sIn = sIn.replace(/NT(B|M)/g, 'N$1');			// retouche TB -> B  TM -> M
        sIn = sIn.replace(/GSU/g, 'SU');					// retouche GS -> SU
        sIn = sIn.replace(/ESD/g, 'ED');					// retouche ESD -> ED
        sIn = sIn.replace(/LESKEL/g, 'LEKEL');			// retouche LESQUEL -> LEKEL
        sIn = sIn.replace(/CK/g, 'K');					// retouche CK -> K

        // Terminaisons
        sIn = sIn.replace(/USIL$/g, 'USI'); 				// terminaisons USIL -> USI
        sIn = sIn.replace(/X$|[TD]S$|[DS]$/g, '');		// terminaisons TS DS LS X T D S...  v2.0
        sIn = sIn.replace(/([^KL]+)T$/g, '$1');			// sauf KT LT terminal
        sIn = sIn.replace(/^[H]/g, '');					// H pseudo muet en début de mot, je sais, ce n'est pas une terminaison
        const sBack2 = sIn;												// on sauve le code (utilisé pour les mots très courts)
        sIn = sIn.replace(/TIL$/g, 'TI');				// terminaisons TIL -> TI
        sIn = sIn.replace(/LC$/g, 'LK');					// terminaisons LC -> LK
        sIn = sIn.replace(/L[E]?[S]?$/g, 'L');			// terminaisons LE LES -> L
        sIn = sIn.replace(/(.+)N[E]?[S]?$/g, '$1N');		// terminaisons NE NES -> N
        sIn = sIn.replace(/EZ$/g, 'E');					// terminaisons EZ -> E
        sIn = sIn.replace(/OIG$/g, 'OI');				// terminaisons OIG -> OI
        sIn = sIn.replace(/OUP$/g, 'OU');				// terminaisons OUP -> OU
        sIn = sIn.replace(/([^R])OM$/g, '$1ON');			// terminaisons OM -> ON sauf ROM
        sIn = sIn.replace(/LOP$/g, 'LO');				// terminaisons LOP -> LO
        sIn = sIn.replace(/NTANP$/g, 'NTAN');			// terminaisons NTANP -> NTAN
        sIn = sIn.replace(/TUN$/g, 'TIN');				// terminaisons TUN -> TIN
        sIn = sIn.replace(/AU$/g, 'O');					// terminaisons AU -> O
        sIn = sIn.replace(/EI$/g, 'AI');					// terminaisons EI -> AI
        sIn = sIn.replace(/R[DG]$/g, 'R');				// terminaisons RD RG -> R
        sIn = sIn.replace(/ANC$/g, 'AN');				// terminaisons ANC -> AN
        sIn = sIn.replace(/KROC$/g, 'KRO');				// terminaisons C muet de CROC, ESCROC
        sIn = sIn.replace(/HOUC$/g, 'HOU');				// terminaisons C muet de CAOUTCHOUC
        sIn = sIn.replace(/OMAC$/g, 'OMA');				// terminaisons C muet de ESTOMAC (mais pas HAMAC)
        sIn = sIn.replace(/([J])O([NU])[CG]$/g, '$1O$2');// terminaisons C et G muet de OUC ONC OUG
        sIn = sIn.replace(/([^GTR])([AO])NG$/g, '$1$2N');// terminaisons G muet ANG ONG sauf GANG GONG TANG TONG
        sIn = sIn.replace(/UC$/g, 'UK');					// terminaisons UC -> UK
        sIn = sIn.replace(/AING$/g, 'IN');				// terminaisons AING -> IN
        sIn = sIn.replace(/([EISOARN])C$/g, '$1K');		// terminaisons C -> K
        sIn = sIn.replace(/([ABD-MO-Z]+)[EH]+$/g, '$1');	// terminaisons E ou H sauf pour C et N
        sIn = sIn.replace(/EN$/g, 'AN');					// terminaisons EN -> AN (difficile à faire avant sans avoir des soucis) Et encore, c'est pas top!
        sIn = sIn.replace(/(NJ)EN$/g, '$1AN');			// terminaisons EN -> AN
        sIn = sIn.replace(/^PAIEM/g, 'PAIM'); 			// PAIE -> PAI
        sIn = sIn.replace(/([^NTB])EF$/g, '$1');			// F muet en fin de mot

        sIn = sIn.replace(/(.)\1/g, '$1'); 				// supression des répétitions (suite à certains remplacements)

        // cas particuliers, bah au final, je n'en ai qu'un ici
        let convPartIn = ['FUEL'];
        let convPartOut = ['FIOUL'];
        _.zip(convPartIn, convPartOut).forEach(function (value) {
            sIn = sIn.replace(value[0], value[1]);
        });

        // Ce sera le seul code retourné à une seule lettre!
        if (sIn == 'O') return (sIn);

        // seconde chance sur les mots courts qui ont souffert de la simplification
        if (sIn.length < 2) {
            // Sigles ou abréviations
            if (sBack.match(/[BCDFGHJKLMNPQRSTVWXYZ][BCDFGHJKLMNPQRSTVWXYZ][BCDFGHJKLMNPQRSTVWXYZ][BCDFGHJKLMNPQRSTVWXYZ]*/)) {
                return (sBack);
            }

            if (sBack.match(/[RFMLVSPJD][AEIOU]/)) {
                if (sBack.length == 3) {
                    return sBack.substring(0, 2); // mots de trois lettres supposés simples
                }

                if (sBack.length == 4) {
                    return sBack.substring(0, 3); // mots de quatre lettres supposés simples
                }
            }

            if (sBack2.length > 1) {
                return sBack2;
            }
        }

        if (sIn.length > 1) {
            return sIn.substring(0, maxLength);
        } else {
            return '';
        }
    }
};
