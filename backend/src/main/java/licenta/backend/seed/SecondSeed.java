package licenta.backend.seed;

import licenta.backend.model.Faculty;
import licenta.backend.model.University;
import licenta.backend.repository.FactoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RequiredArgsConstructor
@Component
public class SecondSeed implements CommandLineRunner {

    private final FactoryRepository factoryRepository;


    @Override
    public void run(String... args) throws Exception {

        University u1 = new University("Universitatea Babes Bolyai");
        University u2 = new University("Universitatea Tehnică Gheorghe Asachi");
        University u3 = new University("Universitatea Alexandru Ioan Cuza");
        University u4 = new University("Universitatea Tehnica Cluj Napoca");
        University u5 = new University("Universitatea Politehnica Bucuresti");
        University u6 = new University("Universitatea Bucuresti");

        List<University> universities = new ArrayList<>();
        universities.add(u1);
        universities.add(u2);
        universities.add(u3);
        universities.add(u4);
        universities.add(u5);
        universities.add(u6);
        universities.forEach(university -> factoryRepository.createUniversityRepository().save(university));


        Faculty f2 = new Faculty(u1     ,"Facultatea de Biologie şi Geologie",	46.763302,	23.588771,	"Str. Republicii (Gh. Bilașcu) nr.44, Cluj-Napoca, 400015",	"Str. Republicii (Gh. Bilașcu) nr.44, Cluj-Napoca, 400015",	"9-10 13-29",	"No exam",	"30",	0	,	120);
        Faculty f14 = new Faculty(u1	,	"Facultatea de Geografie",	46.765233	,	23.579347	,	 "Str.Clinicilor Nr. 5-7, Cluj-Napoca, 400006",	 "Str.Clinicilor Nr. 5-7, Cluj-Napoca, 400006",	"9-29",	"No exam",	"17",	0	,	170);

        Faculty f15 = new Faculty(u1	,	"Facultatea de Drept",	46.770185	,	23.588782	,	"Str.Avram Iancu nr. 11, Cluj-Napoca, 400089",	"Str.Avram Iancu nr. 11, Cluj-Napoca, 400089",	"9-11 13-15",	"No exam",	"17",	0	,	250);
        Faculty f16 = new Faculty(u1	,	"Facultatea de Litere",	46.778682	,	23.586575	,	"Str. Horea nr. 31, Cluj-Napoca, 400202",	"Str. Horea nr. 31, Cluj-Napoca, 400202",	"9-12",	"No exam",	"18",	0	,	120);
        Faculty f166 = new Faculty(u2	,	"Automatică şi Calculatoare",	47.154264	,	27.59403	,	"Universitatea Tehnică Gheorghe Asachi, Bulevardul Profesor Dr. doc. Dimitrie Mangeron 27, Iași 700050",	"Universitatea Tehnică Gheorghe Asachi, Bulevardul Profesor Dr. doc. Dimitrie Mangeron 27, Iași 700050",	"13-28",	"No exam"	,"29",	0	,	100);
        Faculty f17 = new Faculty(u2	,	"Electronică, Telecomunicaţii şi Tehnologia Informaţiei",	47.174986	,	27.571789	,	"Bulevardul Carol I nr. 11A, Iași 700506",	"Bulevardul Carol I nr. 11A, Iași 700506",	"13-28",	"29",	"29",	0	,	100);
        Faculty f18 = new Faculty(u2	,	"Construcţii şi Instalaţii",	47.152221	,	27.589068	,	"Str. Prof.dr.doc Dimitrie Mangeron nr 1, Iași 700050",	"Str. Prof.dr.doc Dimitrie Mangeron nr 1, Iași 700050",	"13-28",	"No exam",	"29",	0	,	100);
        Faculty f19 = new Faculty(u2	,	"Mecanică",	47.15417	,	27.597705	,	"Universitatea Tehnică Gheorghe Asachi, Bulevardul Profesor Dr. doc. Dimitrie Mangeron 61-63, Iași 700050",	"Universitatea Tehnică Gheorghe Asachi, Bulevardul Profesor Dr. doc. Dimitrie Mangeron 61-63, Iași 700050",	"13-28",	"No exam",	"29",	0	,	100);
        Faculty f111 = new Faculty(u3	,	"Facultatea de biologie ",	47.174621	,	27.572481	,	"Bulevardul Carol I nr. 20A, Iași 700505",	"Bulevardul Carol I nr. 20A, Iași 700505",	"14-25",	"No exam"	,"29",	0	,	150);
        Faculty f221 = new Faculty(u3	,	"Facultatea de chimie ",	47.175577	,	27.57133	,	"Corpul A, Universitatea Alexandru Ioan Cuza, intrarea Kogălniceanu, Bulevardul Carol I 11, Iași 700506",	"Corpul A, Universitatea Alexandru Ioan Cuza, intrarea Kogălniceanu, Bulevardul Carol I 11, Iași 700506",	"15-25",	"No exam",	"29",	0	,	150);
        Faculty f1222 = new Faculty(u3	,	"Facultatea de drept ",	47.395272	,	27.545829	,	"Bulevardul Carol I nr. 11, Iași 700506",	"Bulevardul Carol I nr. 11, Iași 700506",	"16-25",	"28",	"29",	0	,	150);
        Faculty f1388 = new Faculty(u3	,	"Facultatea de Informatica ",	47.174191	,	27.574868	,	"Strada General Henri Mathias Berthelot Nr. 16, Iași 700259",	"Strada General Henri Mathias Berthelot Nr. 16, Iași 700259",	"16-25",	"28"	,"28",	0	,	150);
        Faculty f148 = new Faculty(u3	,	"Facultatea de Matematica ",	47.174363	,	27.572091	,	"Bulevardul Carol I 11, Iași 700506",	"Bulevardul Carol I 11, Iași 700506",	"16-25",	"26",	"28",	0	,	150);
        Faculty f137 = new Faculty(u5	,	"Automatică şi Calculatoare",	44.435932	,	26.047656	,	"Splaiul Independenței 313, București",	"Splaiul Independenței 313, București",	"15-24",	"27",	"28",	0	,	160);
        Faculty f146 = new Faculty(u5	,	"Electronică, Telecomunicaţii şi Tehnologia Informaţiei",	44.43403	,	26.057491	,	"Bulevardul Iuliu Maniu 1-3, București 061071",	"Bulevardul Iuliu Maniu 1-3, București 061071",	"15-25",	"No exam",	"28",	0	,	160);
        Faculty f135 = new Faculty(u5	,	"Facultatea de Inginerie Mecanică și Mecatronică",	44.440867	,	26.048735	,	"Universitatea Politehnica, Splaiul Independenței 313, București 060042",	"Universitatea Politehnica, Splaiul Independenței 313, București 060042",	"15-27",	"No exam",	"28",	0	,	160);
        Faculty f145 = new Faculty(u6	,	"Facultatea de Chimie",	44.435704	,	26.101238	,	"Bulevardul Regina Elisabeta 4-12, București 030018",	"Bulevardul Regina Elisabeta 4-12, București 030018",	"14-26",	"29",	"29",	0	,	150);
        Faculty f134 = new Faculty(u6	,	"Facultatea de Biologie",	44.439675	,	26.064361	,	"Grădina Botanică, Intrarea Portocalelor 3, București",	"Grădina Botanică, Intrarea Portocalelor 3, București",	"15-26",	"28",	"29",	0	,	150);
        Faculty f143 = new Faculty(u6	,	"Facultatea de Geografie",	44.436262	,	26.101767	,	"Bulevardul Nicolae Bălcescu 1, București 010041",	"Bulevardul Nicolae Bălcescu 1, București 010041",	"16-26",	"28",	"29",	0	,	150);
        Faculty f132 = new Faculty(u6	,	"Facultatea de Drept",	44.435394	,	26.082098	,	"Universitatea din București, Bulevardul Mihail Kogălniceanu 36-46, București 050107",	"Universitatea din București, Bulevardul Mihail Kogălniceanu 36-46, București 050107",	"16-26",	"29"	,"30",	0	,	360);

        List<Faculty> faculties = new ArrayList<>();
        faculties.add(f2);
        faculties.add(f14);
        faculties.add(f15);
        faculties.add(f16);
        faculties.add(f166);
        faculties.add(f17);
        faculties.add(f18);
        faculties.add(f19);
        faculties.add(f111);
        faculties.add(f221);
        faculties.add(f1222);
        faculties.add(f1388);
        faculties.add(f148);
        faculties.add(f137);
        faculties.add(f146);
        faculties.add(f135);
        faculties.add(f145);
        faculties.add(f134);
        faculties.add(f143);
        faculties.add(f132);
        faculties.forEach(faculty -> factoryRepository.createFacultyRepository().save(faculty));

        

    }
}
