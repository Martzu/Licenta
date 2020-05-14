package licenta.backend.repository;

import licenta.backend.model.Accommodation;
import licenta.backend.model.AppUser;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface AccommodationRepository extends Repository<Accommodation, Integer> {

    public Accommodation save(Accommodation accommodation);

    public Optional<Accommodation> findById(Integer id);

    public void deleteAccommodationById(Integer id);

    public Optional<Accommodation> getAccommodationByAppUser(AppUser appUser);
}
