package licenta.backend.controller;


import licenta.backend.dto.FacultyDTO;
import licenta.backend.dto.Test;
import licenta.backend.model.UserAdmission;
import licenta.backend.service.ServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@Component
@RequiredArgsConstructor
@RestController
public class UserAdmissionController {
    private final ServiceFactory serviceFactory;

    @PostMapping("/user-admission/confirm")
    public void confirmUserAdmissionParticipation(@RequestBody Test test) throws Exception{
        serviceFactory.appUserService().confirmParticipationToFacultyAdmission(test.getUsername(), test.getFacultyId());
    }

    @PostMapping("/user-admission/results")
    public String getResultsForAdmission(@RequestBody Test test) throws Exception {
        UserAdmission userAdmission = (UserAdmission) serviceFactory.appUserService().getAppUserAdmissions(test.getUsername()).stream().filter(admission -> admission.getId().equals(test.getFacultyId()));
        userAdmission.setResult("Admitted Tax Free!");
        serviceFactory.appUserService().addResultToAdmission(userAdmission);
        return "Admitted Tax Free!";
    }


}
