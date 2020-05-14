package licenta.backend.repository;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FactoryRepositoryImplementation implements FactoryRepository{

    private final AppUserRepository appUserRepository;

    private final FacultyRepository facultyRepository;

    private final AccommodationRepository accommodationRepository;

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
}
