package licenta.backend.repository;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FactoryRepositoryImplementation implements FactoryRepository{

    private final AppUserRepository appUserRepository;

    private final FacultyRepository facultyRepository;

    private final AccommodationRepository accommodationRepository;

    private final UniversityRepository universityRepository;

    private final UserAdmissionRepository userAdmissionRepository;

    @Override
    public AppUserRepository createAppUserRepository() {
        return appUserRepository;
    }

    @Override
    public FacultyRepository createFacultyRepository() {
        return facultyRepository;
    }

    @Override
    public AccommodationRepository createAccommodationRepository() { return accommodationRepository; }

    @Override
    public UniversityRepository createUniversityRepository() { return universityRepository; }

    @Override
    public UserAdmissionRepository createUserAdmissionRepository() { return userAdmissionRepository; }
}
