package licenta.backend.repository;

public interface FactoryRepository {

    public AppUserRepository createAppUserRepository();

    public FacultyRepository createFacultyRepository();

    public AccommodationRepository createAccommodationRepository();

    public UniversityRepository createUniversityRepository();

    public UserAdmissionRepository createUserAdmissionRepository();
}
