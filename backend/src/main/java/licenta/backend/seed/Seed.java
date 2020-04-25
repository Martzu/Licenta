package licenta.backend.seed;


import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import licenta.backend.model.AppUser;
import licenta.backend.model.Faculty;
import licenta.backend.repository.FactoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class Seed implements CommandLineRunner {

    private final FactoryRepository factoryRepository;

    //private static final String requiredDocumentsFilePath = "/home/martzu/Facultate/Licenta/DataProcessor/requiredDocumentx.txt";

    private static final String[] dataPaths = {"/home/martzu/Facultate/Licenta/UbbTest/ubb.json",
                                        "/home/martzu/Facultate/Licenta/DataProcessor/utcn.json"};

    public void run(String... args) throws Exception {

        //String documentsRequired = Files.readString(Paths.get(requiredDocumentsFilePath));

        AppUser appUser = new AppUser("a", "a");

        Arrays.asList(dataPaths).forEach(path -> {
            try {
                Reader reader = Files.newBufferedReader(Paths.get(path));

                List<Faculty> faculties = new Gson().fromJson(reader, new TypeToken<List<Faculty>>() {}.getType());


                faculties.forEach(faculty -> {
                    //faculty.setDocumentsRequired(documentsRequired);
                    faculty.setSignUpPlace(faculty.getAddress());
                    factoryRepository.createFacultyRepository().save(faculty);
                });

            } catch (IOException e) {
                e.printStackTrace();
            }

        });

        factoryRepository.createFacultyRepository().findAll().forEach(System.out::println);
        factoryRepository.createAppUserRepository().save(appUser);
    }
}
