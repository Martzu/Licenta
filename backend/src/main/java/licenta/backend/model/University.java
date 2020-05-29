package licenta.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class University {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String abbreviation;

    @OneToMany(mappedBy = "university", cascade = {CascadeType.ALL})
    private List<Faculty> faculties;


    public University(String name){
        this.name = name;
        this.abbreviation = Arrays.stream(name.split(" ")).reduce("", (accummulator, element) -> accummulator + element.charAt(0));
        System.out.println(abbreviation);
    }

    public String toString(){
        return this.name + " " + this.abbreviation;
    }
}
