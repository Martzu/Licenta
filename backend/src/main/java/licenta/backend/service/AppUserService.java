package licenta.backend.service;


import licenta.backend.dto.FacultyDTO;
import licenta.backend.model.AppUser;
import licenta.backend.model.Faculty;
import licenta.backend.repository.FactoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppUserService {

    private final FactoryRepository factoryRepository;

    public List<FacultyDTO> getAppUserAdmissions(String username) throws Exception{
        AppUser appUser = factoryRepository.createAppUserRepository().findByUsername(username).orElseThrow(() -> new Exception("Username does not exist"));
        List<AppUser> appUserWrapper = new ArrayList<>();
        appUserWrapper.add(appUser);
        return factoryRepository.createFacultyRepository().findByAppUsersIn(appUserWrapper).stream().map(FacultyDTO::new).collect(Collectors.toList());
    }

    public List<FacultyDTO> getAppUserNotSignedAdmissions(String username) throws Exception{
        AppUser appUser = factoryRepository.createAppUserRepository().findByUsername(username).orElseThrow(() -> new Exception("Username does not exist"));
        return  factoryRepository.createFacultyRepository().findAll().stream().filter(faculty -> !faculty.getAppUsers().contains(appUser)).map(FacultyDTO::new).collect(Collectors.toList());
    }

    @Transactional
    public void participateToFacultyAdmission(String username, Integer facultyId) throws Exception {
        Faculty faculty = factoryRepository.createFacultyRepository().findById(facultyId).orElseThrow(() -> new Exception("Incorrect facultyId"));
        AppUser appUser = factoryRepository.createAppUserRepository().findByUsername(username).orElseThrow(() -> new Exception("Username does not exist"));

        faculty.getAppUsers().add(appUser);

        factoryRepository.createFacultyRepository().save(faculty);

    }

    @Transactional
    public void removeParticipationFromFacultyAdmission(String username, Integer facultyId) throws Exception{
        Faculty faculty = factoryRepository.createFacultyRepository().findById(facultyId).orElseThrow(() -> new Exception("Incorrect facultyId"));
        AppUser appUser = factoryRepository.createAppUserRepository().findByUsername(username).orElseThrow(() -> new Exception("Username does not exist"));

        List<Faculty> remainingAdmissions = appUser.getFaculties().stream().filter(admission -> !admission.getId().equals(facultyId)).collect(Collectors.toList());
        List<AppUser> remainingStudents = faculty.getAppUsers().stream().filter(student -> !student.getUsername().equals(username)).collect(Collectors.toList());

        faculty.setAppUsers(remainingStudents);
        appUser.setFaculties(remainingAdmissions);

        factoryRepository.createAppUserRepository().save(appUser);
        factoryRepository.createFacultyRepository().save(faculty);

    }

}