using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using WeightWatchers.Api.DTO;
using WeightWatchers.Data;
using WeightWatchers.Data.Entities;
using WeightWatchers.Services;
using WeightWatchers.Services.Models;

namespace WeightWatchers.Api
{
    class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects

            CreateMap<SubscriberDTO, SubscriberModel>();
            CreateMap<CardDTO, CardModel>();
            CreateMap<SubscriberModel, Subscriber>();
            CreateMap<CardModel, Card>();
            CreateMap<Card, CardModel>();
            CreateMap<CardModel, CardDTO>();
        }
    }
}
