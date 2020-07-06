using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WeightWatchers.Services.Models;

namespace WeightWatchers.Services
{
    public class SubscriberService : ISubscriberSevice
    {
        private readonly ISubscriberRepository _subscriberRepository;
        private readonly IMapper _mapper;

        public SubscriberService(ISubscriberRepository subscriberRepository,
            IMapper mapper)
        {
            _subscriberRepository = subscriberRepository;
            _mapper = mapper;
        }

        public async Task<bool> addAsynce(SubscriberModel subsciberModel, float height)
        {
            try
            {
                
                var isSeccseed = await _subscriberRepository.addAsync(subsciberModel, height);
                if (isSeccseed == 2)
                    return true;
                else if (isSeccseed == -1)
                {
                    throw new Exception("this email exists, try another");
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return false;
        }

        public async Task<string> loginAsync(string email, string password)
        {
            return await _subscriberRepository.loginAsync(email, password);
        }
    }
}
