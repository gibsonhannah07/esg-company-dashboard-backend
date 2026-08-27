package com.gibsonhannah07.esg_company_dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import com.gibsonhannah07.esg_company_dashboard.repository.UserRepository;
import com.gibsonhannah07.esg_company_dashboard.model.User;


@SpringBootApplication
public class EsgCompanyDashboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(EsgCompanyDashboardApplication.class, args);
	}

	@Bean
	CommandLineRunner test(UserRepository repo) {
		return args -> {
			repo.save(new User("Hannah"));
			System.out.println("Saved user!");
		};
	}
}

