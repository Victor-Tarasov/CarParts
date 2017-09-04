package viktor.tarasov;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import viktor.tarasov.model.Brand;
import viktor.tarasov.model.CarPart;
import viktor.tarasov.model.CarPartsDAO;

import java.util.List;

@RestController
@RequestMapping(value = "/carParts")
public class CarPartsController {

    @Autowired
    private CarPartsDAO carPartsDAO;

    @CrossOrigin
    @RequestMapping(value = "/add",
            method = RequestMethod.POST,
            consumes = {"application/json"},
            produces = {"application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    public void createPart(@RequestBody CarPart carPart) {
        carPartsDAO.saveNewPart(carPart);
    }

    @CrossOrigin
    @RequestMapping(value = "",
            method = RequestMethod.GET,
            produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    private List<CarPart> getAllParts() {
        return carPartsDAO.getAllPars();
    }

    @CrossOrigin
    @RequestMapping(value = "/brands",
            method = RequestMethod.GET,
            produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    private List<Brand> getModels() {
        return carPartsDAO.getBrands();
    }
}