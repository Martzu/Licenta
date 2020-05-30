package licenta.backend.controller;

import licenta.backend.dto.AccommodationDTO;
import licenta.backend.dto.AppUserDTO;
import licenta.backend.dto.FacultyDTO;
import licenta.backend.dto.Test;
import licenta.backend.service.ServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class UserController {

    private final ServiceFactory serviceFactory;

    @PostMapping("/accommodation")
    public void addAccommodation(@RequestBody Test test) throws Exception{
        serviceFactory.appUserService().addAccommodationToUser(test.getUsername(), test.getAccommodationDTO());
    }

    @PostMapping("/userAccommodation")
    public AccommodationDTO getUserAccommodation(@RequestBody Test test) throws Exception{
        return serviceFactory.appUserService().getUserAccommodation(test.getUsername());
    }

    @PostMapping("/user/faculties")
    public List<FacultyDTO> getAllUserAdmissions(@RequestBody Test test) throws Exception {
        return serviceFactory.appUserService().getAppUserAdmissions(test.getUsername()).stream().sorted(Comparator.comparing(FacultyDTO::getName)).collect(Collectors.toList());
    }

    @PostMapping("/user")
    public void updateUserFilters(@RequestBody Test test) throws Exception{
        serviceFactory.appUserService().updateUserFilters(test.getUsername(), test.getCityFilter(), test.getFacultyTypeFilter());
    }

    @PostMapping("/login")
    public AppUserDTO loginUser(@RequestBody Test test) throws Exception{//check in front if username is not empty
        return new AppUserDTO(serviceFactory.appUserService().authenticateUser(test.getUsername(), test.getPassword()));
    }


}
