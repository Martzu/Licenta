package licenta.backend.service;


import licenta.backend.dto.FacultyDTO;
import licenta.backend.model.Faculty;
import licenta.backend.repository.FactoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacultyService {

    private final FactoryRepository factoryRepository;

    public List<FacultyDTO> getAllFaculties() {

        return factoryRepository.createFacultyRepository().findAll().stream().map(FacultyDTO::new).collect(Collectors.toList());

    }




}
