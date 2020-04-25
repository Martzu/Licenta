package licenta.backend.repository;

public interface FactoryRepository {

    public AppUserRepository createAppUserRepository();

    public FacultyRepository createFacultyRepository();
}
