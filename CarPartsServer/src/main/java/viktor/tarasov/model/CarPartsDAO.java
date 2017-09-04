package viktor.tarasov.model;

import lombok.experimental.FieldDefaults;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@Repository
@Transactional
@FieldDefaults(level = PRIVATE)
public class CarPartsDAO {

    @Autowired
    SessionFactory sessionFactory;

    @SuppressWarnings("unchecked")
    public List<CarPart> getAllPars() {
        return currentSession().createCriteria(CarPart.class).list();
    }

    public void saveNewPart(CarPart carPart) {
        currentSession().persist(carPart);
    }

    @SuppressWarnings("unchecked")
    public List<Brand> getBrands() {
        return currentSession().createCriteria(Brand.class).list();
    }

    private Session currentSession() {
        return sessionFactory.getCurrentSession();
    }
}
