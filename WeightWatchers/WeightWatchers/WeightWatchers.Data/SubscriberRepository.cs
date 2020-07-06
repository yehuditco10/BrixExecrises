using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeightWatchers.Data.Entities;
using WeightWatchers.Services;
using WeightWatchers.Services.Models;

namespace WeightWatchers.Data
{
    public class SubscriberRepository : ISubscriberRepository
    {
        private readonly WeightWatchersContext _context;
        private readonly IMapper _mapper;

        public SubscriberRepository(WeightWatchersContext weightWatchersContext,
            IMapper mapper)
        {
            _context = weightWatchersContext;
            _mapper = mapper;
        }
        public async Task<int> addAsync(SubscriberModel subsciberModel, float height)
        {
            try
            {
                var exists = await _context.Subscribers.FirstOrDefaultAsync(s => s.email == subsciberModel.email);
                if (exists == null)
                {
                    //SubscriberEntity newSunscriber = _mapper.Map<SubscriberEntity>(subsciber);
                    //await _weightWatchersContext.AddAsync(newSunscriber);
                    subsciberModel.id = Guid.NewGuid();
                    Subscriber s = _mapper.Map<Subscriber>(subsciberModel);
                    await _context.Subscribers.AddAsync(s);
                    await _context.Cards.AddAsync(new Card()
                    {
                        BMI = 0,
                        subscriberId = subsciberModel.id,
                        height = height,
                        openDate=DateTime.Today

                    });
                    return await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw new Exception("register failed");
            }
            return -1;
        }

        public async Task<string> loginAsync(string email, string password)
        {
            Subscriber subscriber = await _context.Subscribers.FirstOrDefaultAsync(
                s => s.email == email && s.password == password);
            if (subscriber == null)
            {
                throw new Exception("401");
            }
            var card = await _context.Cards.FirstOrDefaultAsync(
                c => c.subscriberId == subscriber.id);
            return card.id.ToString();
        }
    }
}
