package licenta.backend.repository;

import licenta.backend.model.University;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface UniversityRepository extends Repository<University, Integer> {

    public Optional<University> findById(Integer id);

    public Optional<University> findByAbbreviation(String abbreviation);

    public University save(University university);

}
