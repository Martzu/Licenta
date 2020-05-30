package licenta.backend.service;


import licenta.backend.dto.AccommodationDTO;
import licenta.backend.dto.FacultyDTO;
import licenta.backend.model.Accommodation;
import licenta.backend.model.AppUser;
import licenta.backend.model.Faculty;
import licenta.backend.model.UserAdmission;
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
        return getUserAttendingFacultyAdmissions(appUser).stream()
                .map(FacultyDTO::new).collect(Collectors.toList());

    }

    public List<FacultyDTO> getAppUserNotSignedAdmissions(String username) throws Exception{
        AppUser appUser = factoryRepository.createAppUserRepository().findByUsername(username).orElseThrow(() -> new Exception("Username does not exist"));
        return factoryRepository.createFacultyRepository().findAll().stream()
                .filter(faculty -> !getUserAttendingFacultyAdmissions(appUser).contains(faculty))
                .map(FacultyDTO::new).collect(Collectors.toList());
    }

    public AccommodationDTO getUserAccommodation(String username) throws Exception{
        AppUser appUser = factoryRepository.createAppUserRepository().findByUsername(username).orElseThrow(() -> new Exception("Username does not exist"));
        return new AccommodationDTO(factoryRepository.createAccommodationRepository().getAccommodationByAppUser(appUser).orElseGet(Accommodation::new));
    }

    @Transactional
    public void participateToFacultyAdmission(String username, Integer facultyId) throws Exception {

        AppUser appUser = factoryRepository.createAppUserRepository().findByUsername(username).orElseThrow(() -> new Exception("Username does not exist"));
        Faculty faculty = factoryRepository.createFacultyRepository().findById(facultyId).orElseThrow(() -> new Exception("Incorrect facultyId"));

        UserAdmission userAdmission = new UserAdmission(faculty, appUser);
        factoryRepository.createUserAdmissionRepository().save(userAdmission);

    }

    @Transactional
    public void addAccommodationToUser(String username, AccommodationDTO accommodationDTO) throws Exception{
        AppUser appUser = factoryRepository.createAppUserRepository().findByUsername(username).orElseThrow(() -> new Exception("Username does not exist"));

        Accommodation accommodation = factoryRepository.createAccommodationRepository().save(new Accommodation(accommodationDTO));

        accommodation.setAppUser(appUser);
        appUser.setAccommodation(accommodation);

        factoryRepository.createAccommodationRepository().save(accommodation);
        factoryRepository.createAppUserRepository().save(appUser);
    }

    @Transactional
    public void updateUserFilters(String username, boolean[] cityFilter, boolean[] facultyTypeFilter) throws Exception{
        AppUser appUser = factoryRepository.createAppUserRepository().findByUsername(username).orElseThrow(() -> new Exception("Username does not exist"));
        appUser.setIasiFilter(cityFilter[0]);
        appUser.setClujFilter(cityFilter[1]);
        appUser.setBucurestiFilter(cityFilter[2]);

        appUser.setTechnicFilter(facultyTypeFilter[0]);
        appUser.setUmanisticFilter(facultyTypeFilter[1]);

        factoryRepository.createAppUserRepository().save(appUser);
    }

    public AppUser authenticateUser(String username, String password) throws Exception{
        AppUser appUser = factoryRepository.createAppUserRepository().findByUsername(username).orElseThrow(() -> new Exception("Username does not exist"));
        return password.equals(appUser.getPassword()) ? appUser : new AppUser();
    }

    @Transactional
    public void removeParticipationFromFacultyAdmission(String username, Integer facultyId) throws Exception{

        AppUser appUser = factoryRepository.createAppUserRepository().findByUsername(username).orElseThrow(() -> new Exception("Username does not exist"));
        Faculty faculty = factoryRepository.createFacultyRepository().findById(facultyId).orElseThrow(() -> new Exception("Faculty does not exist"));
        factoryRepository.createUserAdmissionRepository().removeByAppUserAndFaculty(appUser, faculty);
    }



    private List<Faculty> getUserAttendingFacultyAdmissions(AppUser appUser){
        return factoryRepository.createUserAdmissionRepository().findUserAdmissionsByAppUser(appUser).stream()
                .map(UserAdmission::getFaculty)
                .collect(Collectors.toList());
    }

}
